import bunyanLog from '../../utils/bunyanLog';

export default async function(cmdParams, diContext) {

    try {

        bunyanLog.info('creating pet', cmdParams);

        let result = await diContext.model.Pet.create({
            payload: cmdParams.payload,
            createdBy: cmdParams.userId
        });

        diContext.model.Activity.create({
            payload: { title: "Pet created" },
            createdBy: cmdParams.userId,
            targetId: result._id,
            targetType: "Pet",
            type: "CREATED_PET"
        });

        return result;

    } catch (err) {

        bunyanLog.error(err);
        throw "error";

    }

}
