import doAuthentication from './authentication/doAuthentication';
import doRegister from './authentication/doRegister';

import activityCreate from './activity/create';
import activityIndex from './activity/index';

import petCreate from './pet/create';
import petIndex from './pet/index';
import petUpdate from './pet/update';
import petShow from './pet/show';

import deviceCreate from './device/create';
import deviceIndex from './device/index';
import deviceUpdate from './device/update';
import deviceShow from './device/show';

import userCreate from './user/create';
import userIndex from './user/index';
import userUpdate from './user/update';
import userShow from './user/show';

export default {

    "DO_AUTHENTICATION": doAuthentication,
    "DO_REGISTER": doRegister,

    "INDEX_ACTIVITY": activityIndex,
    "CREATE_ACTIVITY": activityCreate,

    "INDEX_PET": petIndex,
    "SHOW_PET": petShow,
    "CREATE_PET": petCreate,
    "UPDATE_PET": petUpdate,

    "INDEX_DEVICE": deviceIndex,
    "SHOW_DEVICE": deviceShow,
    "CREATE_DEVICE": deviceCreate,
    "UPDATE_DEVICE": deviceUpdate,

    "INDEX_USER": userIndex,
    "SHOW_USER": userShow,
    "CREATE_USER": userCreate,
    "UPDATE_USER": userUpdate

};
