import { Schema } from "mongoose";

export default function(data) {

	let filters = data.filters || {};

	if (data.type) filters.type = data.type;

	let options = {
		limit: parseInt(data.limit) || 10,
		page: parseInt(data.page) || 1,
		lean: data.lean
	};

	if (data.sort) options.sort = data.sort;

	if (data.populate) options.populate = data.populate;

	if (data.search) {
		let regex = new RegExp(String(data.search.value), "i");
		filters.$or = [];
		data.search.fields.forEach(field => {
			var obj = {}; obj[field] = regex; filters.$or.push(obj);
		});
	}

    return this.paginate(filters, options);

};
