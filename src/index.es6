import dotenv from 'dotenv';
import _ from 'lodash';
import bunyanLog from './utils/bunyanLog';
import setupRabbitMQService from './utils/setupRabbitMQService';
import setupMongoConnection from './utils/setupMongoConnection';
import models from './persistence/models';

async function start() {

	try {

		let diContext = {};

		bunyanLog.info('setting up mongo connection');

		diContext.mongoConnection = await setupMongoConnection({
			mongoUrl: process.env.MONGO_URL
		});

		bunyanLog.info('setting up mongoose schemas');

        diContext.model = {};
        _.each(models, (schema, name) => {
            diContext.model[name] = diContext.mongoConnection.model(name, schema);
			bunyanLog.info('  '+name+' schema ready');
        });

		bunyanLog.info('setting up rabbitmq service');

		diContext.rabbitMQService = await setupRabbitMQService(diContext);

	} catch (err) {

		bunyanLog.error(err);

	}

}

dotenv.load();
start();
