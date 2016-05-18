import bunyanLog from '../../utils/bunyanLog';

export default async function(cmdParams, diContext) {

    try {

        bunyanLog.info('creating user', cmdParams);

        let user = await diContext.model.User.show({
            filters: { "payload.email": cmdParams.payload.email.toLowerCase() },
            type: "user"
        });

        if (user) throw "user already registered";

        user = await diContext.model.User.create({
            payload: cmdParams.payload,
            password: cmdParams.password
        });

        diContext.model.Activity.create({
            payload: { title: "User created" },
            createdBy: cmdParams.userId,
            targetId: user._id,
            targetType: "User",
            type: "CREATED_USER"
        });

        return user;

    } catch (err) {

        bunyanLog.error(err);
        throw "error";

    }

}
