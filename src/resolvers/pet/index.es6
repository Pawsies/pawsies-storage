import bunyanLog from '../../utils/bunyanLog';

export default async function(cmdParams, diContext) {

    try {

        bunyanLog.info('retrieving pets', cmdParams);

        let result = await diContext.model.Pet.index({
            filters: cmdParams.filters || {},
            limit: cmdParams.limit || 30,
            page: cmdParams.page || 1,
            lean: cmdParams.lean || false,
            sort: cmdParams.sort || undefined,
            populate: cmdParams.populate || undefined,
            search: cmdParams.search || undefined,
            type: "pet"
        });

        return result;

    } catch (err) {

        bunyanLog.error(err);
        throw "error";

    }

}
