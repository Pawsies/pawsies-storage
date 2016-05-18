import { Schema } from 'mongoose';

export default function(data) {

    data.filters.active = true;

    if (data.type) data.filters.type = data.type;

    let q = this.findOne(data.filters);

    if (data.populate) q.populate(data.populate);

    if (data.lean) q.lean();

    return q;

};
