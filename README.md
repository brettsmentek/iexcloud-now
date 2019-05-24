# IEXCloud + Now.sh

## What is this?

I built this to explore deploying a frontend + backend application using [Now 2.0](https://zeit.co/blog/now-2). It's organized as a monorepo with Node.js and Golang lambda backends used to fetch financial data from IEX Cloud.

The entrypoint to this deployment is a Next.js application, compiled to serverless functions that server-render on-demand.

I am using an Apollo GraphQL server, which can be found [here](https://iexcloud-now.brettsmentek.now.sh/api/gql) to fetch data from Golang lambdas and from IEX Cloud directly.

Here is an example query for getting data on `AMZN` from a variety of IEX Cloud API endpoints:

```
query {
  security(ticker: "AMZN") {
    symbol
    volume
    lastSalePrice
    estimates {
      consensusEPS
      numberOfEstimates
    }
    earnings {
      actualEPS
      EPSReportDate
    }
  }
}
```

[Data provided by IEX Cloud](https://iexcloud.io)