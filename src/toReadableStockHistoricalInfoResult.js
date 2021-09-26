const keyMap = {
  dy: 'Dividend Yield',
  p_l: 'P/L',
  p_vp: 'P/VP',
  p_ebita: 'P/EBITDA',
  p_ebit: 'P/EBIT',
  p_sr: 'PSR',
  p_ativo: 'P/Ativo',
  p_capitlgiro: 'P/Capital de Giro',
  p_ativocirculante: 'P/ACL',
  ev_ebitda: 'EV/EBITDA',
  ev_ebit: 'EV/EBIT',
  lpa: 'LPA',
  vpa: 'VPA',
  peg_Ratio: 'PEGRatio',
  dividaliquida_patrimonioliquido: 'Dívida Líquida/Patrimônio',
  dividaliquida_ebitda: 'Dívida Líquida/EBITDA',
  dividaliquida_ebit: 'Dívida Líquida/EBIT',
  patrimonio_ativo: 'Patrimônio/Ativos',
  passivo_ativo: 'Passivos/Ativos',
  liquidezcorrente: 'Liquidez Corrente',
  margembruta: 'Margem Bruta',
  margemebitda: 'Margem EBITDA',
  margemebit: 'Margem EBIT',
  margeliquida: 'Margem Líquida',
  roe: 'ROE',
  roa: 'ROA',
  roic: 'ROIC',
  giro_ativos: 'Giro Ativos',
  receitas_cagr5: 'CAGR Receitas 5 Anos',
  lucros_cagr5: 'CAGR Lucros 5 Anos'
}

const toReadableStockHistoricalInfoResult = (infos) => {
  return infos.map((info) => ({
    key: keyMap[info.key],
    currentValue: info.actual,
    avgValue: info.avg,
    avgDiffValue: info.avgDifference,
    minValue: info.minValue,
    minValueYear: info.minValueRank,
    maxValue: info.maxValue,
    maxValueYear: info.maxValueRank,
    series: info.ranks.map((rank) => ({
      year: rank.rank,
      value: rank.value || null
    }))
  }))
}

module.exports = toReadableStockHistoricalInfoResult
