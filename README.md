# Web3 Goals Subgraph

## Subgraph links

- Development (Mumbai) - https://thegraph.com/hosted-service/subgraph/kiv1n/web3-goals-dev
- Production (Polygon) - https://thegraph.com/hosted-service/subgraph/kiv1n/web3-goals

## Commands for development

- Install Graph CLI: `yarn global add @graphprotocol/graph-cli`
- Install dependencies: `yarn install`
- Set deployment key: `graph auth`
- Generate code for subgraph: `yarn codegen`
- Deploy to subgraph: `yarn deploy`

### Commands for production

- Generate code for subgraph: `graph codegen subgraph-polygon.yaml`
- Deploy to subgraph: `graph deploy --node https://api.thegraph.com/deploy/ kiv1n/web3-goals subgraph-polygon.yaml`
