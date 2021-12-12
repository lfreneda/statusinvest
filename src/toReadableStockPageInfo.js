const cheerio = require('cheerio')

const toReadableStockPageInfo = (html) => {
  const $ = cheerio.load(html)
  const links = $('a.white-text')
  const stockInfo = {}
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
  return stockInfo
}
module.exports = toReadableStockPageInfo
