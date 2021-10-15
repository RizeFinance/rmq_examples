# Rize Message Queue Examples [![Awesome](https://awesome.re/badge.svg)](https://rizefs.com)

[<img src="https://investorjunkie.com/wp-content/uploads/2017/11/rize-2.png" width="160" align="right" alt="eslint">](http://eslint.org)

> Node.js Express RMQ Example using the Rize SDK



## Getting Started

**Gather and place all ENV's required.** 

1) `PROGRAM_UID` Found in the Rize Admin Developer Launchpad
2) `PROGRAM_HMAC` Found in the Rize Admin Developer Launchpad
3) `RIZE_ENV` Accepted values: sandbox, integration, production
4) `RMQ_HOSTS` Given by a Rize Program Manager, differs per `RIZE_ENV`
5) `RMQ_CLIENT_ID` Unique value for the broker to identify the client. `ex: company-prototype-app`
6) `RMQ_TOPIC` Found in the Rize Admin Developer Launchpad under Program Configs
7) `RMQ_USERNAME` Found in the Rize Admin Developer Launchpad under Program Configs
8) `RMQ_PASSWORD` Found in the Rize Admin Developer Launchpad under Program Configs



**Install node dependencies and run in development mode**

```bash
$ npm install && npm run dev
```

