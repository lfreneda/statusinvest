const cheerio = require('cheerio')
const moment = require('moment')

const getSectorSubSectorAndSegmentInfo = ({ html, stockInfo }) => {
  const $ = cheerio.load(html)
  const links = $('a.white-text')
  for (const link of links) {
    const isSectorLink = link.attribs.href && link.attribs.title && link.attribs.title.includes('Ver outras empresas do setor')
    if (isSectorLink) {
      stockInfo.Setor = $(link).find('strong').text()
    }
    const isSubSectorLink = link.attribs.href && link.attribs.title && link.attribs.title.includes('Ver outras empresas do subsetor')
    if (isSubSectorLink) {
      stockInfo.SubSetor = $(link).find('strong').text()
    }
    const isSegmentLink = link.attribs.href && link.attribs.title && link.attribs.title.includes('Ver outras empresas do segmento')
    if (isSegmentLink) {
      stockInfo.Segmento = $(link).find('strong').text()
    }
  }
  const spans = $('span.sub-value')
  for (const span of spans) {
    const spanText = $(span).text()
    if (spanText === 'SETOR DE ATUAÇÃO') {
      const strong = $(span.parentNode).find('a strong.value')
      stockInfo.Setor = $(strong).text()
    }
    if (spanText === 'SUBSETOR DE ATUAÇÃO') {
      const strong = $(span.parentNode).find('a strong.value')
      stockInfo.SubSetor = $(strong).text()
    }
    if (spanText === 'SEGMENTO DE ATUAÇÃO') {
      const strong = $(span.parentNode).find('a strong.value')
      stockInfo.Segmento = $(strong).text()
    }
  }
}

const getCompanyGeneralInfo = ({ html, stockInfo }) => {
  const $ = cheerio.load(html)
  const names = [
    'Valor atual',
    'Min. 52 semanas',
    'Máx. 52 semanas',
    'Valorização (12m)',
    'Patrimônio líquido',
    'Ativos',
    'Ativo circulante',
    'Dívida bruta',
    'Disponibilidade',
    'Dívida líquida',
    'Valor de mercado',
    'Valor de firma',
    'Segmento de listagem',
    'Tipo',
  ]
  const divs = $('div.top-info div.info div div')
  for (const div of divs) {
    const name = $(div).find('h3.title').text()
    if (name && names.includes(name)) {
      const value = $(div).find('strong').text()
      stockInfo[name] = tryParseFloatBrStyle(value)
    }
  }
}

const getInvestorsTableInfo = ({ html, stockInfo }) => {
  const $ = cheerio.load(html)
  const input = $('#posicaoacionaria input#results')
  if (!input) { return null }
  const inputValue = input.val()
  if (!inputValue) { return null }
  const investors = JSON.parse(inputValue)
  stockInfo.Investidores = investors.map((investor) => {
    for (const key of Object.keys(investor)) {
      investor[key] = tryParseFloatBrStyle(investor[key])
    }
    return {
      Acionista: investor.Acionista,
      CpfCnpj: investor.CpfCnpj,
      PessoaFisica: investor.PessoaFisica,
      Nacionalidade: investor.Nacionalidade,
      DataUltimaAlteracao: investor.DataUltimaAlteracao,
      PercentualOrdinarias: investor.PercentualOrdinarias,
      PercentualPreferencial: investor.PercentualPreferencial,
      PercentualTotal: investor.PercentualTotal,
      AcionistaControlador: fromBrToBoolean(investor.AcionistaControlador),
      AcordoAcionistas: fromBrToBoolean(investor.AcionistaControlador),
      QuantidadeOrdinarias: investor.QuantidadeOrdinarias,
      QuantidadePreferencial: investor.QuantidadePreferencial,
      QuantidadeTotal: investor.QuantidadeTotal
    }
  })
}

const getEarningsTableInfo = ({ html, stockInfo }) => {
  const $ = cheerio.load(html)
  const input = $('#earning-section input#results')
  const earnings = JSON.parse(input.val())
  stockInfo.Proventos = earnings.map((earning) => {
    return {
      Tipo: earning.et,
      ValorOriginal: earning.v,
      ValorEventoDesdobramentoAgrupamento: earning.ov || earning.v,
      DataCom: moment(earning.ed, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      DataPagamento: moment(earning.pd, 'DD/MM/YYYY').format('YYYY-MM-DD')
    }
  })
}

const fromBrToBoolean = (value) => {
  if (value.toLowerCase() === 'sim') {
    return true
  }
  if (value.toLowerCase() === 'não') {
    return false
  }
}

const tryParseFloatBrStyle = (value) => {
  if (value === '' || value === '-') {
    return undefined
  }
  const originalValue = (' ' + value).slice(1)
  try {
    value = value.replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '')
    value = value.replace(',', '.')
    if (value.endsWith('%')) {
      return parseFloat(value) / 100
    } else if (isNaN(value)) {
      return originalValue
    } else {
      return parseFloat(value)
    }
  } catch {
    return originalValue
  }
}

const toReadableStockPageInfo = (html) => {
  const stockInfo = {}
  getSectorSubSectorAndSegmentInfo({ html, stockInfo })
  getCompanyGeneralInfo({ html, stockInfo })
  getInvestorsTableInfo({ html, stockInfo })
  getEarningsTableInfo({ html, stockInfo })
  return stockInfo
}
module.exports = toReadableStockPageInfo
