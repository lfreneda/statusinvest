const moment = require('moment')
const { _ } = require('underscore')

const toReadableStockHistoricalPriceResult = (prices) => {
  return _.sortBy(prices.map((item) => ({
    Valor: item.price,
    Quando: moment(item.date, 'DD/MM/YY HH:mm').format('YYYY-MM-DD')
  })), 'Quando')
}

module.exports = toReadableStockHistoricalPriceResult
