# f1explorer

## Introduction
(Work in progress...) - this is the beginnings of an dashboard application to examine the historical dataset generated by the FIA Formula One motor racing series. The intention is to use a modern web stack to expose some interesting views of this data, and satisfy some questions I have about the the changes in the sport over time

## Stack
The application is built on a JS-centric stack. The client front-end is React/Typescript/Apollo, the back-end platform is Node/KeystoneJS and data transmission takes place over a GraphQL api. The datastore itself is a simple object database using MongoDB.

## Requirements
[NodeJS 10.0 +](https://www.nodejs.com)

[MongoDB 4.2.6](https://www.mongodb.com)

Yarn or NPM etc

## Progress
Currently the application is at a very early state - an initial datalayer is running and the entire database can be queried across GraphQL from the client. Next steps are to enrich the client application with some more useful views

## Building
This is really an experiment in its earliest stage. However, it can be run in 3 steps:

### Populate database
```bash
mongorestore -d f1 f1
```

### Build services
```bash
cd f1
yarn && yarn dev
```

### build client
```bash
cd client
yarn && yarn start
```

## Data source
The data this application is built on is provided as-is from https://www.kaggle.com/rohanrao/formula-1-world-championshaip-1950-2020 as CSVs and converted to MongoDB collections.