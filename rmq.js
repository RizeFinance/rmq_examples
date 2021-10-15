const express = require('express');
const os = require('os');
const app = express();
const server = require('http').Server(app);
const Rize = require('@rizefinance/rize-js');

// Set the port we are listening to
const listen = (httpServer, port) => {
    return new Promise((resolve) => {
        httpServer.listen(port, () => {
            console.log(`api-server: listening on ${port}`);
            resolve();
        });
    });
};

Promise
    .all([
        listen(server, '3000'),
    ])
    .then(() => {
        /**
         * Init providers
         */
        const rize = new Rize(
            process.env.PROGRAM_UID,
            process.env.PROGRAM_HMAC,
            { environment: process.env.RIZE_ENV }
        );

        /**
         * Init Rize Message Queue connection
         */
        const rmqClient = rize.rmq.connect(
            process.env.RMQ_HOSTS,
            process.env.RMQ_CLIENT_ID,
            process.env.RMQ_TOPIC,
            process.env.RMQ_USERNAME,
            process.env.RMQ_PASSWORD
        );


        rmqClient.on('connecting', function (connector) {
            const address = connector.serverProperties.remoteAddress.transportPath;

            console.log('Connecting to ' + address);
        });

        rmqClient.on('connect', function (connector) {
            const address = connector.serverProperties.remoteAddress.transportPath;

            console.log('Connected to ' + address);
        });

        rmqClient.on('error', function (error) {
            const connectArgs = error.connectArgs;
            const address = connectArgs.host + ':' + connectArgs.port;

            console.log('Connection error to ' + address + ': ' + error.message);
        });

        const listener = (err, msg, ack, nack) => {
            if (!err) {
                try {
                    msg.readString('UTF-8', (err, body) => {
                        const message = JSON.parse(body);
                        console.log("EVENT: ", message)
                        if (!message) {
                            nack();
                            return;
                        }

                        ack();
                    });
                } catch (e) {
                    logger.error(e);
                    nack();
                }
            } else {
              logger.error(err);
              nack();
            }
        };


        rmqClient.subscribeToRizeTopic(
            'customer',
            'customerSubscription',
            listener,
            'client-individual'
        );
    })
    .catch((reason) => {
        console.log(reason);
    });
