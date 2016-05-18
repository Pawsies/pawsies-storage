import bunyanLog from '../../utils/bunyanLog';

export default async function(cmdParams, diContext) {

    try {

        bunyanLog.info('retrieving device', cmdParams);

        let result = await diContext.model.Device.show({
            filters: cmdParams.filters || {},
            lean: cmdParams.lean || false,
            populate: cmdParams.populate || undefined,
            type: "device"
        });

        return result;

    } catch (err) {

        bunyanLog.error(err);
        throw "error";

    }

}
