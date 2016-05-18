import bunyanLog from '../../utils/bunyanLog';

export default async function(cmdParams, diContext) {

    try {

        bunyanLog.info('authenticating', cmdParams);

        let user = await diContext.model.User.show({
            filters: { "payload.email": cmdParams.email.toLowerCase() },
            type: "user"
        });

        if (!user) throw "invalid email";

        if (user.authenticate(cmdParams.password)) {

            return user;

        } else {

            throw "wrong password";

        }

    } catch (err) {

        bunyanLog.error(err);
        throw "Invalid email or password";

    }

}
