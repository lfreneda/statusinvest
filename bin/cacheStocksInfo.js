const BRDb = require('node-localdb')('stocks-br.json')
const EUADb = require('node-localdb')('stocks-eua.json')
const statusInvest = require('../src/index')
const moment = require('moment')

const run = async () => {
  const brStocks = await statusInvest.getStocksInfo()
  for (const stock of brStocks) {
    console.log(`[BR] Getting ${stock.Ativo}'s historial indicators`)
    const stockHistoricalInfo = await statusInvest.getStockHistoricalInfo({
      ticker: stock.Ativo
    })
    console.log(`[BR] Getting ${stock.Ativo}'s page info`)
    const stockPageInfo = await statusInvest.getStockPageInfo({
      ticker: stock.Ativo
    })
    console.log(`[BR] Getting ${stock.Ativo}'s historial prices`)
    const stockHistoricalPrice = await statusInvest.getStockHistoricalPrice({
      ticker: stock.Ativo
    })
    await BRDb.insert({
      Ativo: stock.Ativo,
      ...stock,
      ...stockPageInfo,
      Cotações: stockHistoricalPrice,
      Indicadores: {
        ...stockHistoricalInfo
      },
      AtualizadoEm: moment.utc().format()
    })
    console.log(`[BR] Cached ${stock.Ativo}'s infos`)
  }

  const euaStocks = await statusInvest.getEUAStocksInfo()
  for (const stock of euaStocks) {
    console.log(`[EUA] Getting ${stock.Ativo}'s historial indicators`)
    const stockHistoricalInfo = await statusInvest.getEUAStockHistoricalInfo({
      ticker: stock.Ativo
    })
    console.log(`[EUA] Getting ${stock.Ativo}'s page info`)
    const stockPageInfo = await statusInvest.getEUAStockPageInfo({
      ticker: stock.Ativo
    })
    console.log(`[EUA] Getting ${stock.Ativo}'s historial prices`)
    const stockHistoricalPrice = await statusInvest.getEUAStockHistoricalPrice({
      ticker: stock.Ativo
    })
    await EUADb.insert({
      Ativo: stock.Ativo,
      ...stock,
      ...stockPageInfo,
      Cotações: stockHistoricalPrice,
      Indicadores: {
        ...stockHistoricalInfo
      },
      AtualizadoEm: moment.utc().format()
    })
    console.log(`[EUA] Cached ${stock.Ativo}'s infos`)
  }
}

run()
