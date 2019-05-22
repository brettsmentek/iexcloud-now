const { RESTDataSource } = require('apollo-datasource-rest')

class RestApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'https://iexcloud-now.brettsmentek.now.sh/api'
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