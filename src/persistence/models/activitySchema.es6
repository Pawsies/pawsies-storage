import schemaBuilder from '../../utils/schemaBuilder';
import { Schema } from 'mongoose';

export default schemaBuilder.BuildSchema('Activity', {
    $type: Schema.Types.Mixed
}, {
    type: 'activity'
});
