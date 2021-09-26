<div align="center">
  <img src=".github/static/logo.png" alt="StatusInvest logo" height="109px">
  <div><code>npm install statusinvest --save</code></div>
  <br>
  <p>
    StatusInvest's stocks info web scraper
  </p>
  <p>

[![Maintainability](https://api.codeclimate.com/v1/badges/c4c8c5621ca66693196f/maintainability)](https://codeclimate.com/github/lfreneda/statusinvest/maintainability)

  </p>
  <small>
    Built with ❤  by 
      <a href="https://github.com/lfreneda">Luiz Freneda</a> and
      <a href="https://github.com/lfreneda/statusinvest/graphs/contributors">contributors</a> - <a href="https://fieldcontrol.com.br/vaga-para-desenvolvedor.html?utm_source=github&utm_medium=opensource&utm_campaign=contaazul">Estou contratando desenvolvedores JavaScript</a>
  </small>
</div>

---

## Installation

This client is intended for server side use only.

```
npm install statusinvest --save
```

<div align="center">
  <img height="30px" src=".github/static/separator.png"/>
</div>

## Playground

You can run and watch everything working fine at [bin/playground.js](https://github.com/lfreneda/statusinvest/blob/master/bin/playground.js) script

```
node bin/playground.js
```

<div align="center">
  <img height="30px" src=".github/static/separator.png"/>
</div>

## Usage

```js
const statusInvest = require('statusinvest')
```

<div align="center">
  <img height="30px" src=".github/static/separator.png"/>
</div>

### getStocksInfo

```js
// Create a product
const stocks = await statusInvest.getStocksInfo()
// [
//     {
//         "Ativo": "BBDC4",
//         "Empresa": "BANCO BRADESCO",
//         "Cotação": 20.26,
//         "P/L": 9.0385,
//         "P/VP": 1.3442,
//         "PSR": 2.219,
//         "Dividend Yield": 5.9418,
//         "P/Ativo": 0.1408,
//         "P/Capital de Giro": 2.4567,
//         "P/EBIT": 7.0645,
//         "P/ACL": -0.1517,
//         "EV/EBIT": 6.6067,
//         "Margem Ebit": 31.41,
//         "Liquidez Corrente": 4.97,
//         "ROE": 14.87,
//         "CAGR Lucros 5 Anos": 3.74,
//         "CAGR Receitas 5 Anos": -3,
//         "ROA": 1.56,
//         "PL/Ativos": 0.1,
//         "Giro Ativos": 0.06,
//         "Margem Bruta": 56.65,
//         "Passivo/Ativo": 0.9,
//         "Liquidez Média Diária": 925542768.46
//     },
//     {
//         "Ativo": "VALE3",
//         "Empresa": "VALE",
//         "Cotação": 77.69,
//         "P/L": 4.377,
//         "P/VP": 1.913,
//         "PSR": 1.3563,
//         "Dividend Yield": 18.8551,
//         "P/Ativo": 0.8242,
//         "P/Capital de Giro": 7.2014,
//         "P/EBIT": 3.1892,
//         "P/ACL": -1.1178,
//         "EV/EBIT": 3.1978,
//         "Margem Ebit": 42.53,
//         "Liquidez Corrente": 1.77,
//         "ROIC": 35.12,
//         "ROE": 43.71,
//         "CAGR Receitas 5 Anos": 21.72,
//         "Dívida Líquida/Patrimônio": 0.01,
//         "Dívida Líquida/EBIT": 0.01,
//         "ROA": 18.83,
//         "PL/Ativos": 0.43,
//         "Giro Ativos": 0.61,
//         "Margem Bruta": 61.68,
//         "Passivo/Ativo": 0.56,
//         "Liquidez Média Diária": 2677533036.31
//     },
//     ...
// ]
```

<div align="center">
  <img height="30px" src=".github/static/separator.png"/>
</div>

### getStockHistoricalInfo

```js
const stockHistoricalInfo = await statusInvest.getStockHistoricalInfo({ ticker: 'BBDC4' })
// {
//   "Dividend Yield": {
//     "key": "Dividend Yield",
//     "currentValue": 5.9418,
//     "avgValue": 3.8196363636363637,
//     "avgDiffValue": 55.559310738766186,
//     "minValue": 1.2433,
//     "minValueYear": 2016,
//     "maxValue": 7.3601,
//     "maxValueYear": 2015,
//     "series": [
//       { "year": 2021, "value": 5.9418 },
//       { "year": 2020, "value": 2.605 },
//       { "year": 2019, "value": 5.6751 },
//       { "year": 2018, "value": 2.9693 },
//       { "year": 2017, "value": 3.1804 },
//       { "year": 2016, "value": 1.2433 },
//       { "year": 2015, "value": 7.3601 },
//       { "year": 2014, "value": 3.7002 },
//       { "year": 2013, "value": 2.9657 },
//       { "year": 2012, "value": 2.8905 },
//       { "year": 2011, "value": 3.4846 }
//     ]
//   },
//   "P/L": {
//     "key": "P/L",
//     "currentValue": 9.0385,
//     "avgValue": 11.109772727272727,
//     "avgDiffValue": -18.643700263895425,
//     "minValue": 5.3681,
//     "minValueYear": 2015,
//     "maxValue": 15.6611,
//     "maxValueYear": 2018,
//     "series": [
//       { "year": 2021, "value": 9.0385 },
//       { "year": 2020, "value": 15.0142 },
//       { "year": 2019, "value": 13.8738 },
//       { "year": 2018, "value": 15.6611 },
//       { "year": 2017, "value": 12.1004 },
//       { "year": 2016, "value": 9.0003 },
//       { "year": 2015, "value": 5.3681 },
//       { "year": 2014, "value": 9.6316 },
//       { "year": 2013, "value": 9.8734 },
//       { "year": 2012, "value": 11.9131 },
//       { "year": 2011, "value": 10.733 }
//     ]
//   },
//   "P/VP": {
//     "key": "P/VP",
//     "currentValue": 1.3442,
//     "avgValue": 1.7715181818181818,
//     "avgDiffValue": -24.121580359937802,
//     "minValue": 1.0949,
//     "minValueYear": 2015,
//     "maxValue": 2.1811,
//     "maxValueYear": 2019,
//     "series": [
//       { "year": 2021, "value": 1.3442 },
//       { "year": 2020, "value": 1.6752 },
//       { "year": 2019, "value": 2.1811 },
//       { "year": 2018, "value": 2.1443 },
//       { "year": 2017, "value": 1.8721 },
//       { "year": 2016, "value": 1.6035 },
//       { "year": 2015, "value": 1.0949 },
//       { "year": 2014, "value": 1.8097 },
//       { "year": 2013, "value": 1.7253 },
//       { "year": 2012, "value": 1.9204 },
//       { "year": 2011, "value": 2.116 }
//     ]
//   },
//   "P/EBIT": {
//     "key": "P/EBIT",
//     "currentValue": 7.0645,
//     "avgValue": 14.374954545454546,
//     "avgDiffValue": -50.85549677627439,
//     "minValue": 5.0479,
//     "minValueYear": 2016,
//     "maxValue": 59.0724,
//     "maxValueYear": 2020,
//     "series": [
//       { "year": 2021, "value": 7.0645 },
//       { "year": 2020, "value": 59.0724 },
//       { "year": 2019, "value": 21.7971 },
//       { "year": 2018, "value": 13.3588 },
//       { "year": 2017, "value": 8.7092 },
//       { "year": 2016, "value": 5.0479 },
//       { "year": 2015, "value": 10.1357 },
//       { "year": 2014, "value": 7.6307 },
//       { "year": 2013, "value": 8.5473 },
//       { "year": 2012, "value": 8.7115 },
//       { "year": 2011, "value": 8.0494 }
//     ]
//   },
//   ...
// }
```

<div align="center">
  <img height="30px" src=".github/static/separator.png"/>
</div>

## Pull Requests

- **Add tests!** Your patch won't be accepted if it doesn't have tests.
- **Document any change in behaviour**. Make sure the README and any other
  relevant documentation are kept up-to-date.
- **Create topic branches**. Don't ask us to pull from your master branch.
- **One pull request per feature**. If you want to do more than one thing, send
  multiple pull requests.

<div align="center">
  <img height="30px" src=".github/static/separator.png"/>
</div>

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.

<div align="center">
  <br/>
  <br/>
  <br/>
  <br/>
</div>