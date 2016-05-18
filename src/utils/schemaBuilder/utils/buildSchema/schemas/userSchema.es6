import { Schema } from 'mongoose';
import crypto from 'crypto';
import statics from '../methods';

export default function(partial, options) {

    /*
    **  SET-UP SCHEMA PROPERTIES
    */

    let body = {
        payload: partial,
        type: { $type: String, default: options.type, required: true },
	    active: { $type: Boolean, default: true, required: true }
    };

    if (options.authentication) {
        body.salt = { $type: String, required: true };
    	body.hashedPassword = { $type: String, required: true };
    }

    if (options.roles && options.roles.length > 0) {
        body.role = { $type: String, default: options.defaultRole, required: true };
    }

    let schema = new Schema(body, {
        toObject: { virtuals: true },
    	toJSON: { virtuals: true },
    	typeKey: "$type",
        collection: "users",
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

    if (options.roles && options.roles.length > 0) {
        schema
        .path('role')
        .validate(function(role) {
        	return options.roles.indexOf(role) > -1;
        }, 'role value is invalid');
    }

    /*
    **  SET-UP SCHEMA VIRTUALS
    */

    if (options.authentication) {
        schema
        .virtual('password')
        .set(function(password) {
        	this._password = password;
        	this.salt = this.makeSalt();
        	this.hashedPassword = this.encryptPassword(password);
        })
        .get(function() {
        	return this._password;
        });
    }

    /*
    **  SET-UP SCHEMA METHODS
    */

    schema.methods = {};

    if (options.authentication) {
        schema.methods.authenticate = function(plainText) {
        	return this.encryptPassword(plainText) === this.hashedPassword;
        };
        schema.methods.makeSalt = function() {
        	return crypto.randomBytes(16).toString('base64');
        };
        schema.methods.encryptPassword = function(password) {
        	if (!password || !this.salt) return '';
        	var salt = new Buffer(this.salt, 'base64');
        	return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
        };
    }

    /*
    **  SET-UP SCHEMA STATICS
    */

    schema.statics = statics;

    /*
    **  EXPORT SCHEMA
    */

    return schema;

};
