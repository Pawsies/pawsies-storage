import schemaBuilder from '../../utils/schemaBuilder';
import { Schema } from 'mongoose';

export default schemaBuilder.BuildSchema('Customer', {
    deviceId : { $type: String, required: true },
    model : { $type: String, required: true },
    payload: { $type: Schema.Types.Mixed },
    owner : { $type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
    type: 'device'
});
