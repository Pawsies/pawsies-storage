import schemaBuilder from '../../utils/schemaBuilder';
import { Schema } from 'mongoose';

export default schemaBuilder.BuildSchema('Customer', {
    name: { $type: String, required: true },
    birthdate: { $type: Date, required: true },
    type: { $type: String, required: true },
    weight: { $type: Number, required: true },
    payload: { $type: Schema.Types.Mixed },
    owner: { $type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
    type: 'pet'
});
