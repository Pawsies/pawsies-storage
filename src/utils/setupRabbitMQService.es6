import _ from 'lodash';
import hermes from 'runnable-hermes';
import bunyanLog from './bunyanLog';
import resolvers from '../resolvers';

export default async function (context) {

    let service = hermes.hermesSingletonFactory({
        name: 'pawsies',
        hostname: process.env.RABBITMQ_HOST || 'localhost',
        port: process.env.RABBITMQ_PORT || '5672',
        username: process.env.RABBITMQ_USERNAME || 'guest',
        password: process.env.RABBITMQ_PASSWORD || 'guest',
        queues: [ 'pawsies-vault-request', 'pawsies-vault-response' ]
    });

    service.connect().on('ready', () => {

        bunyanLog.info('connected to RabbitMQ');

        service.on('subscribe', (queueName, handlerFn) => bunyanLog.info('subscribed to', queueName));

        service.on('publish', (queueName, data) => bunyanLog.info('response emmited', queueName, data));

        service.subscribe('pawsies-vault-request', (request, done) => {

            bunyanLog.info('request received', 'pawsies-vault-request', request);

            resolvers[request.type](request.payload, context).then(response => {

                service.publish('pawsies-vault-response', {
                    id: request.id,
                    channel: 'pawsies-vault-request',
                    type: request.type,
                    payload: response
                });

            }, error => {

                service.publish('pawsies-vault-response', {
                    id: request.id,
                    channel: 'pawsies-vault-request',
                    type: request.type,
                    error: error
                });

            });

            done();

        });

    });



}
