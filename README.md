# IEXCloud + Now.sh

## What is this?

I built this to explore deploying a frontend + backend application using [Now 2.0](https://zeit.co/blog/now-2). It's organized as a monorepo with Node.js and Golang lambda backends used to fetch financial data from IEX Cloud.

The entrypoint to this deployment is a Next.js application, compiled to serverless functions that server-render on-demand.

[Data provided by IEX Cloud](https://iexcloud.io)