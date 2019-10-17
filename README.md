# An Isomorphic Javascript SDK for Bitcoin, C-lightning and Opentimestamp Vis-à-vis CypherNode.

# Why ?
Cyphernode simplifies to a large extent the historically cumbersome process for an individual to run a full-node and thus participate in the Bitcoin value network.
The aim of the SDK is to further help access by bridging the gap between the "systems software" technological stack and the "product space" where product developers can start easily building apps for the future.

This SDK aims to abstract complications and offer a clean and friendly way to access the value proposition these systems offer with a value add of distributed communication stack.

# Distributed Communication Stack

This SDK also includes helpers and tools that bridge and integrate the Bitcoin network into [Matrix.org](https://matrix.org) distributed communication architecture. 
I have this inhert belief that mixing an encrypted,federated and distirbuted communication protocol with Bitcoin's disitrbuted exchange of value network is a reciepe for magic to happen.
After all in the words of @aantonop

``` 
Money is a language. 
```
POC Apps to come.

---

** UNDER HEAVY WIP **

## Usage,Tests and Examples

Documentation of this SDK is WIP in the meantime client and integration tests serve as 'how-to' examples.
Futhermore the SDK is written in typescript which should help give a better understanding of parameters and return types for the functions being called.

### Client Tests
```
/clients/
```
Contains the individual clients that can be instaniated to access each of Cyphernode's services, at this time these are:

- btcClient.js : All things bitcoin
- lncClient.js : All things lighting
- otsClient.js : (WIP) All this opentimestamp

Test files for each client are included that showcase the usage of functionality

#### Client test requirements and steps:
1. All tests need to have Cyphernode running on your PC
2. You must have a valid Cyphernode admin api key to run the tests and you must pass the key to the SDK tests. The easiest way to do so is using environment variables. Simply create a 
```
.env
``` 
file in the root directory of this repo and add the following enviroment variables:
```
CYPHERNODE_API_KEY=
CYPHER_GATEWAY_URL=https://localhost:2009/v0/
```
then run 
```
yarn test:clients
```

### Integration Tests
Integration tests currently cover
1. Matrix transport and Bridge: Ability to use Matrix.io to communicate with your Cyphernode in a disritbuted and e2e encrypted fashion.

#### Integration Test requirements and steps:

1. Must have a valid matrix synapse server url
2. Must have two pairs of matrix user logins (One to be used to test the server and the other the client)
Best way is to amend the previously mentioned .env file with the following variables:

```bash
CYPHERNODE_MATRIX_USER=
CYPHERNODE_MATRIX_PASS=
CYPHERNODE_MATRIX_TEST_CLIENT_USER=
CYPHERNODE_MATRIX_TEST_CLIENT_PASS=
CYPHERNODE_MATRIX_SERVER=
```

#### Running Integration test steps:

1- Build the docker container, run the following command in the root directory of the repo:
```bash
docker build --tag cyphernode-js-sdk:intergrationTests
```
2-  Run the integration tests in the container just built : 
```bash
docker run -it \
        --network=cyphernodenet \
        --env-file .env \
        -e NODE_TLS_REJECT_UNAUTHORIZED=0 \
        -e CYPHERNODE_GATEWAY_URL="https://dist_gatekeeper_1:443/v0/" \
        cyphernode-js-sdk:intergrationTests node /app/node_modules/ava/cli.js integrationTests/*.spec.js
```
A helper script that runs the exact same commands as above is located in:
```bash
./scripts/docker-integrationTests.sh
```
## TODOs

1. JSDoc this puppy
2. Test coverage for all functions
3. Fix OTS functions
4. Add remaining LN functions
5. Add link to MVP app
