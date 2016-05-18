import bunyanLog from './bunyanLog';
import mongoose from 'mongoose';

export default function (options) {

  return new Promise((resolve, reject) => {

    bunyanLog.info('connecting to: '+options.mongoUrl);

    let connection = mongoose.createConnection();

    connection.on('error', (err) => {

      bunyanLog.error(err);

    });

    connection.once('open', () => {

      bunyanLog.info('mongodb connected', { mongoUrl: options.mongoUrl });

      resolve(connection);

    });

    connection.open(options.mongoUrl);

  });

}
