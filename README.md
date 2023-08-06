<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Inside the project there are 2 servers. One exposes endpoint for calculating cylinder area by provided radius and height. It calculates area using external service via NATS. The second service is external NATS service that calculates area.

## Swagger
 - Run the main server
 - Access swagger via http://localhost:3001/api/docs

## Installation

```bash
$ cd external-nats-server
$ npm ci --legacy-peer-deps
$ cd ../server
$ npm ci
```

## Running the app

Development mode
```bash
$ cd external-nats-server
$ npm run start:dev
$ cd ../server
$ npm run start:dev
```

Production mode
```bash
$ cd external-nats-server
$ npm run start:prod
$ cd ../server
$ npm run start:prod
```