import bunyanLog from '../../utils/bunyanLog';

export default async function(cmdParams, diContext) {

    try {

        bunyanLog.info('retrieving pet', cmdParams);

        let result = await diContext.model.Pet.show({
            filters: cmdParams.filters || {},
            lean: cmdParams.lean || false,
            populate: cmdParams.populate || undefined,
            type: "pet"
        });

        return result;

    } catch (err) {

        bunyanLog.error(err);
        throw "error";

    }

}
