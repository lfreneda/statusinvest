const db = require('node-localdb')('stocks-indicators.json')
const statusInvest = require('../src/index')
const moment = require('moment')

const run = async () => {
  const stocks = await statusInvest.getStocksInfo()
  for (const stock of stocks) {
    console.log(`Getting ${stock.Ativo}'s historial indicators`)
    const stockHistoricalInfo = await statusInvest.getStockHistoricalInfo({
      ticker: stock.Ativo
    })
    console.log(`Getting ${stock.Ativo}'s page info`)
    const stockPageInfo = await statusInvest.getStockPageInfo({
      ticker: stock.Ativo
    })
    console.log({
      Ativo: stock.Ativo,
      Indicadores: {
        ...stockHistoricalInfo
      },
      ...stockPageInfo,
      AtualizadoEm: moment.utc().format()
    })
    await db.insert({
      Ativo: stock.Ativo,
      ...stock,
      ...stockPageInfo,
      Indicadores: {
        ...stockHistoricalInfo
      },
      AtualizadoEm: moment.utc().format()
    })
    console.log(`Cached ${stock.Ativo}'s infos`)
  }
}

run()
