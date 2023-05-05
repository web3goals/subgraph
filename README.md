# Web3 Goals Subgraph

## Subgraph links

- Mumbai Development - https://thegraph.com/hosted-service/subgraph/kiv1n/web3-goals-dev
- Mumbai Production - https://thegraph.com/hosted-service/subgraph/kiv1n/web3-goals

## Commands

- Install Graph CLI: `yarn global add @graphprotocol/graph-cli`
- Install dependencies: `yarn install`
- Set deployment key: `graph auth`
- Update generated code: `yarn codegen-mumbai`
- Deploy to mumbai development subgraph: `yarn deploy-mumbai`
- Deploy to mumbai development subgraph with production config: `yarn deploy-mumbai-production`
- Deploy to mumbai production subgraph: `graph deploy --node https://api.thegraph.com/deploy/ kiv1n/web3-goals subgraph-mumbai-production.yaml`
