import React from 'react'
import 'isomorphic-unfetch'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const getPriceForTicker = gql`
  query price($ticker: String!) {
    tops(ticker: $ticker) {
      lastSalePrice
    }
  }
`

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  renderMoney = (lastSalePrice) => {    
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lastSalePrice)
  }

  render () {
    const { ticker } = this.props

    const queryVars = {
      ticker,
    }

    return (
      <Query query={getPriceForTicker} variables={queryVars} pollInterval={5000}>
        {({ error, data: { tops: { lastSalePrice } } }) => {
          if (error) {
            return <span>Error</span>
          }

          return (
            <div className="clock">
              <strong>The current price of {ticker}</strong><br/> according IEX Cloud is: <div>{this.renderMoney(lastSalePrice)}</div>
            </div>
          )
        }}
      </Query>
    ) 
  }
}
