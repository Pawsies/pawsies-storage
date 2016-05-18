import { Schema } from 'mongoose';
import statics from '../methods';

export default function(partial, options) {

    /*
    **  SET-UP SCHEMA PROPERTIES
    */

    let body = {
        payload: partial,
        type: { $type: String, required: true },
        createdBy: { $type: Schema.Types.ObjectId, ref: 'User' },
        targetId: { $type: Schema.Types.ObjectId, required: true },
    	targetType: { $type: String, required: true }
    };

    let schema = new Schema(body, {
        toObject: { virtuals: true },
    	toJSON: { virtuals: true },
    	typeKey: "$type",
        collection: "activities",
        timestamps: {
            createdAt: "createdOn",
            updatedAt: "updatedOn"
        }
    });

    /*
    **  SET-UP SCHEMA STATICS
    */

    schema.statics = statics;

    /*
    **  EXPORT SCHEMA
    */

    return schema;

};
