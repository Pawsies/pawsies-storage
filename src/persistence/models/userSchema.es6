import schemaBuilder from '../../utils/schemaBuilder';

export default schemaBuilder.BuildSchema('User', {
    firstName : { $type: String, required: true },
    lastName : { $type: String, required: true },
    birthdate : { $type: Date },
    email : { $type: String, required: true },
    country : { $type: String },
    city : { $type: String }
}, {
    authentication: true,
    roles: ['user','administrator'],
    defaultRole: 'user',
    type: 'user'
});
