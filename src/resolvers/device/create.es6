import bunyanLog from '../../utils/bunyanLog';

export default async function(cmdParams, diContext) {

    try {

        bunyanLog.info('creating device', cmdParams);

        let result = await diContext.model.Device.create({
            payload: cmdParams.payload,
            createdBy: cmdParams.userId
        });

        diContext.model.Activity.create({
            payload: { title: "Device created" },
            createdBy: cmdParams.userId,
            targetId: result._id,
            targetType: "Device",
            type: "CREATED_DEVICE"
        });

        return result;

    } catch (err) {

        bunyanLog.error(err);
        throw "error";

    }

}
