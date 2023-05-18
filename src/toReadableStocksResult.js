const toReadableStocksResult = (statusInvestStock) => {
  return {
    Ativo: statusInvestStock.ticker,
    Empresa: statusInvestStock.companyName,
    Cotação: statusInvestStock.price,
    'P/L': statusInvestStock.p_L,
    'P/VP': statusInvestStock.p_VP,
    PSR: statusInvestStock.p_SR,
    'Dividend Yield': statusInvestStock.dy,
    'P/Ativo': statusInvestStock.p_Ativo,
    'P/Capital de Giro': statusInvestStock.p_CapitalGiro,
    'P/EBIT': statusInvestStock.p_Ebit,
    'P/ACL': statusInvestStock.p_AtivoCirculante,
    'EV/EBIT': statusInvestStock.eV_Ebit,
    'Margem Ebit': statusInvestStock.margemEbit,
    'Margem Líquida': statusInvestStock.margemLiquida,
    'Liquidez Corrente': statusInvestStock.liquidezCorrente,
    ROIC: statusInvestStock.roic,
    ROE: statusInvestStock.roe,
    'CAGR Lucros 5 Anos': statusInvestStock.lucros_Cagr5,
    'CAGR Receitas 5 Anos': statusInvestStock.receitas_Cagr5,
    'Dívida Líquida/Patrimônio': statusInvestStock.dividaliquidaPatrimonioLiquido,
    'Dívida Líquida/EBIT': statusInvestStock.dividaLiquidaEbit,
    ROA: statusInvestStock.roa,
    'PL/Ativos': statusInvestStock.pl_Ativo,
    'Giro Ativos': statusInvestStock.giroAtivos,
    'Margem Bruta': statusInvestStock.margemBruta,
    'Passivo/Ativo': statusInvestStock.passivo_Ativo,
    'Liquidez Média Diária': statusInvestStock.liquidezMediaDiaria
  }
}

module.exports = toReadableStocksResult
