import { Schema } from 'mongoose';
import statics from '../methods';

export default function(partial, options) {

    /*
    **  SET-UP SCHEMA PROPERTIES
    */

    let body = {
        payload: partial,
        type: { $type: String, default: options.type, required: true },
	    active: { $type: Boolean, default: true, required: true },
        createdBy: { $type: Schema.Types.ObjectId, ref: 'User', required: true }
    };

    let schema = new Schema(body, {
        toObject: { virtuals: true },
    	toJSON: { virtuals: true },
    	typeKey: "$type",
        collection: "cases",
        timestamps: {
            createdAt: "createdOn",
            updatedAt: "updatedOn"
        }
    });

    /*
    **  SET-UP SCHEMA VALIDATIONS
    */

    schema
    .path('type')
    .validate(function(type) {
        return type === options.type;
    }, 'type value is invalid');

    /*
    **  SET-UP SCHEMA STATICS
    */

    schema.statics = statics;

    /*
    **  EXPORT SCHEMA
    */

    return schema;

};
