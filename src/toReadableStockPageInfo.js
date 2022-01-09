const cheerio = require('cheerio')

const getSectorSubSectorAndSegmentInfo = ({ html, stockInfo }) => {
  const $ = cheerio.load(html)
  const links = $('a.white-text')
  for (const link of links) {
    const isSectorLink = link.attribs.href && link.attribs.title.includes('Ver outras empresas do setor')
    if (isSectorLink) {
      stockInfo.Setor = $(link).find('strong').text()
    }
    const isSubSectorLink = link.attribs.href && link.attribs.title.includes('Ver outras empresas do subsetor')
    if (isSubSectorLink) {
      stockInfo.SubSetor = $(link).find('strong').text()
    }
    const isSegmentLink = link.attribs.href && link.attribs.title.includes('Ver outras empresas do segmento')
    if (isSegmentLink) {
      stockInfo.Segmento = $(link).find('strong').text()
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
    'Segmento de listagem'
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

const getInvestorsInfo = ({ html, stockInfo }) => {
  const $ = cheerio.load(html)
  const input = $('#posicaoacionaria input#results')
  const investors = JSON.parse(input.val())
  stockInfo.Investors = investors.map((investor) => {
    console.log(investor)
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
  getInvestorsInfo({ html, stockInfo })
  return stockInfo
}
module.exports = toReadableStockPageInfo
