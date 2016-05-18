import bunyanLog from '../../utils/bunyanLog';
import _ from 'lodash';

export default async function(cmdParams, diContext) {

    try {

        bunyanLog.info('creating activity', cmdParams);

        let result = await diContext.model.Activity.create(cmdParams);

        if (cmdParams.targetType === "Device") {

            let device = await diContext.model.Device.findById(cmdParams.targetId);

            var parsed = device.toJSON();

            device.payload.payload = _.assign(parsed.payload.payload, cmdParams.payload);

            await device.save();

        }

        return result;

    } catch (err) {

        bunyanLog.error(err);
        throw "error";

    }

}
