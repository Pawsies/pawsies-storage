var Promise = require('bluebird');

export default function(query, options) {

    query   = query || {};
    options = options || {};

    var select     = options.select;
    var sort       = options.sort;
    var populate   = options.populate;
    var lean       = options.lean || false;
    var leanWithId = options.hasOwnProperty('leanWithId') ? options.leanWithId : true;

    var limit = options.hasOwnProperty('limit') ? options.limit : 10;
    var skip, offset, page;

    if (options.hasOwnProperty('offset')) {
        offset = options.offset;
        skip   = offset;
    } else if (options.hasOwnProperty('page')) {
        page = options.page;
        skip = (page - 1) * limit;
    } else {
        offset = 0;
        page   = 1;
        skip   = offset;
    }

    var promises = {
        docs:  Promise.resolve([]),
        count: this.count(query).exec()
    };

    if (limit) {
        var query = this.find(query)
                        .select(select)
                        .sort(sort)
                        .skip(skip)
                        .limit(limit)
                        .lean(lean);

        if (populate) {
            [].concat(populate).forEach(function(item) {
                query.populate(item);
            });
        }

        promises.docs = query.exec();

        if (lean && leanWithId) {
            promises.docs = promises.docs.then(function(docs) {
                docs.forEach(function(doc) {
                    doc.id = String(doc._id);
                });

                return docs;
            });
        }
    }

    return Promise.props(promises)
        .then(function(data) {
            var result = {
                docs:  data.docs,
                total: data.count,
                limit: limit
            };

            if (offset !== undefined) {
                result.offset = offset;
            }

            if (page !== undefined) {
                result.page  = page;
                result.pages = Math.ceil(data.count / limit) || 1;
            }

            return result;
        });
}
