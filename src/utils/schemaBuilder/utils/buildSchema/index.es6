import schemas from './schemas';

export default (model, partial, options) => {

    if (schemas[model]) {

        return schemas[model](partial, options);

    } else {

        throw "NO_MATCHING_SCHEMA";

    }

};
