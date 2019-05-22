import React from 'react'
import 'isomorphic-unfetch'
import Autosuggest from 'react-autosuggest'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const getAllAllowableTickers = gql`
  query tickers {
    symbols {
      symbol
    }
  }
`
export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: 'AMZN',
      selected: 'AMZN',
      suggestions: [],
      price: props.price,
      touched: false,
      renderCurs: 0,
    }
  }

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
  
    return inputLength === 0 ? [] : this.options.filter(option =>
      option.symbol.toLowerCase().slice(0, inputLength) === inputValue
    )
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
      touched: true,
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  getSuggestionValue = suggestion => suggestion.symbol

  renderSuggestion = suggestion => (
    <div>
      {suggestion.symbol}
    </div>
  )

  onSuggestionSelected = (event, { suggestionValue, method}) => {
    if (method === 'enter') {
      event.preventDefault()
    }

    this.setState({
      selected: suggestionValue,
    })
  }

  onSubmit = (event) => {
    const { suggestions, value } = this.state
    const symbol = suggestions[0] && suggestions[0].symbol
    event.preventDefault()

    this.setState({
      selected: symbol || value,
      value: symbol || value,
    })

  }

  shouldRenderSuggestions = () => {
    const { touched } = this.state

    if (!touched) {
      return false
    }

    return true
  }

  render () {
    const { putTicker } = this.props
    const { value, suggestions, selected } = this.state

    const inputProps = {
      placeholder: 'Type a ticker',
      value,
      onChange: this.onChange,
    }
    return (
      <Query query={getAllAllowableTickers}>
        {({ error, data: { symbols } }) => {
          if (error) {
            return <span>Error</span>
          }
          this.options = symbols
          return (
            <>
              <form onSubmit={this.onSubmit}>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionSelected={this.onSuggestionSelected}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={this.getSuggestionValue}
                  renderSuggestion={this.renderSuggestion}
                  shouldRenderSuggestions={this.shouldRenderSuggestions}
                  inputProps={inputProps}
                />
              </form>
              {putTicker(selected)}
            </>
          )
        }}
      </Query>
    ) 
  }
}
