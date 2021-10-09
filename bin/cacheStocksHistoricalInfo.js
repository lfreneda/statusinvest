const db = require('node-localdb')('db/stocks-historial-indicators.json')
const statusInvest = require('../src/index')
const moment = require('moment')

const run = async () => {
  const stocks = await statusInvest.getStocksInfo()
  for (const stock of stocks) {
    console.log(`Getting ${stock.Ativo}'s historial indicators`)
    const stockHistoricalInfo = await statusInvest.getStockHistoricalInfo({
      ticker: stock.Ativo
    })
    const existingStockHistoricalInfo = await db.findOne({ Ativo: stock.Ativo })
    if (existingStockHistoricalInfo) {
      await db.remove({ Ativo: stock.Ativo })
    }
    await db.insert({
      Ativo: stock.Ativo,
      Indicadores: {
        ...stockHistoricalInfo
      },
      AtualizadoEm: moment.utc().format()
    })
    console.log(`Cached ${stock.Ativo}'s historial indicators`)
  }
}

run()
