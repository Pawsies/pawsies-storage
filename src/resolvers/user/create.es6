import bunyanLog from '../../utils/bunyanLog';

export default async function(cmdParams, diContext) {

    try {

        bunyanLog.info('creating user', cmdParams);

        let result = await diContext.model.User.create({
            payload: cmdParams.payload,
            password: cmdParams.password
        });

        diContext.model.Activity.create({
            payload: { title: "User created" },
            createdBy: cmdParams.userId,
            targetId: result._id,
            targetType: "User",
            type: "CREATED_USER"
        });

        return result;

    } catch (err) {

        bunyanLog.error(err);
        throw "error";

    }

}
