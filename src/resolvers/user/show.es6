import bunyanLog from '../../utils/bunyanLog';

export default async function(cmdParams, diContext) {

    try {

        bunyanLog.info('retrieving user', cmdParams);

        let result = await diContext.model.User.show({
            filters: cmdParams.filters || {},
            lean: cmdParams.lean || false,
            populate: cmdParams.populate || undefined,
            type: "user"
        });

        return result;

    } catch (err) {

        bunyanLog.error(err);
        throw "error";

    }

}
