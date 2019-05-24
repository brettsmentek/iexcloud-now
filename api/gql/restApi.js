const { RESTDataSource } = require('apollo-datasource-rest')

class RestApi extends RESTDataSource {
  constructor() {
    super()
  }

  get baseURL() {
    if (process.env.NOW_REGION === 'dev1') {
      return 'http://localhost:3000/api'
    } else {
      return 'https://iexcloud-now.brettsmentek.now.sh/api'
    }
  }

  async getTops(symbol) {
    return this.post(
      'tops',
      JSON.stringify({ "symbol": symbol }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }

  async getSymbols() {
    return this.get('symbols')
  }
}

module.exports = RestApi