const statusInvest = require('./../src/index')

const run = async () => {
  // const stocks = await statusInvest.getStocksInfo()
  // for (const stock of stocks) {
  //   console.log(JSON.stringify(stock, null, 2))
  // }
  // const stockHistoricalInfo = await statusInvest.getStockHistoricalInfo({
  //   ticker: 'BBDC4'
  // })
  // console.log(JSON.stringify(stockHistoricalInfo, null, 2))

  // const stocks = await statusInvest.cache.getStocksInfo()
  // for (const stock of stocks) {
  //   console.log(stock)
  // }

  const info = await statusInvest.getStockPageInfo({ ticker: 'MEAL3' })
  console.log(info)
}

run()
