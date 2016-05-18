import _ from 'lodash';
import bunyanLog from '../../utils/bunyanLog';

export default async function(cmdParams, diContext) {

    try {

        bunyanLog.info('updating device', cmdParams);

        let document = await diContext.model.Device.findOne(cmdParams.filters);

        let update = cmdParams.payload;

        delete update.updatedOn;
        delete update.createdOn;
        delete update.type;
        delete update._id;

        document = _.assign(document, update);

        let result = await document.save();

        return result;

    } catch (err) {

        bunyanLog.error(err);
        throw "error";

    }

}
