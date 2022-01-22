const statusInvest = require('./../src/index')

const run = async () => {
  // const stocks = await statusInvest.getEUAStocksInfo()
  // for (const stock of stocks) {
  //   console.log(JSON.stringify(stock, null, 2))
  // }
  const res = await statusInvest.getEUAStockHistoricalPrice({
    ticker: 'ko'
  })
  console.log(res)

  // const stocks = await statusInvest.cache.getStocksInfo()
  // for (const stock of stocks) {
  //   console.log(stock)
  // }
  // const info = await statusInvest.getStockPageInfo({ ticker: 'TRPL4' })
  // console.log(info)
}

run()
