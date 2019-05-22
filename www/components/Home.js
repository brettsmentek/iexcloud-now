import Link from 'next/link'
import Price from './Price'
import Search from './Search'
import 'isomorphic-unfetch'

const Home = () => <div className="container">
    <div className="logo">
      <h1>IEX Cloud + Now.sh</h1>
    </div>
    <div className="stocks">
      <span className="wrapper">
        <Search putTicker={ticker => (
          <Price ticker={ticker} />
        )}/>
      </span>
    </div>
    <div className="intro">
      <hr/>
      <h2>What is this?</h2>
      <p>I built this to explore deploying a frontend + backend application using <a href="https://zeit.co/blog/now-2" target="_blank">Now 2.0</a>. It's organized as a monorepo with Node.js and Golang lambda backends used to fetch financial data from IEX Cloud.</p>
      <p>The entrypoint to this deployment is a Next.js application, compiled to serverless functions that server-render on-demand.</p>
      <p>
      I am using an Apollo GraphQL server, which can be found{' '}
      <Link href="/api/gql">
        <a>here</a>
      </Link>
      , to provide data to Apollo Client Query components. 
      </p>
      <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
    </div>
  </div>

export default Home
