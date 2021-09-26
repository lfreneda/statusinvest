const statusInvest = require('./../src/index')

const run = async () => {
  const stocks = await statusInvest.getStocksInfo()
  for (const stock of stocks) {
    console.log(stock)
  }
  const stockHistoricalInfo = await statusInvest.getStockHistoricalInfo({
    ticker: 'BBDC4'
  })
  console.log(stockHistoricalInfo)
}

run()
