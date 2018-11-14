/**
  Juju UserManager version 2.
  This API facade is available on controller connections.

  NOTE: this file has been generated by the generate command in js-libjuju
  on Fri 2018/11/09 14:32:38 UTC. Do not manually edit this file.
*/

'use strict';

const {createAsyncHandler} = require('../transform.js');

/**
  UserManagerAPI implements the user manager interface and is the concrete
  implementation of the api end point.
*/
class UserManagerV2 {

  constructor(transport, info) {
    this._transport = transport;
    this._info = info;
    this.version = 2;
  }

  /**
    AddUser adds a user with a username, and either a password or a randomly
    generated secret key which will be returned.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          users: []{
            username: string,
            displayName: string,
            password: string
          }
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          results: []{
            tag: string,
            secretKey: []int,
            error: {
              message: string,
              code: string,
              info: {
                macaroon: anything,
                macaroonPath: string
              }
            }
          }
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  addUser(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#AddUsers
      if (args) {
        params = {};
        params['users'] = [];
        args.users = args.users || [];
        for (let i = 0; i < args.users.length; i++) {
          // github.com/juju/juju/apiserver/params#AddUser
          if (args.users[i]) {
            params['users'][i] = {};
            params['users'][i]['username'] = args.users[i].username;
            params['users'][i]['display-name'] = args.users[i].displayName;
            params['users'][i]['password'] = args.users[i].password;
          }
        }
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'UserManager',
        request: 'AddUser',
        version: 2,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#AddUserResults
        if (resp) {
          result = {};
          result.results = [];
          resp['results'] = resp['results'] || [];
          for (let i = 0; i < resp['results'].length; i++) {
            // github.com/juju/juju/apiserver/params#AddUserResult
            if (resp['results'][i]) {
              result.results[i] = {};
              result.results[i].tag = resp['results'][i]['tag'];
              result.results[i].secretKey = [];
              resp['results'][i]['secret-key'] = resp['results'][i]['secret-key'] || [];
              for (let i2 = 0; i2 < resp['results'][i]['secret-key'].length; i2++) {
                result.results[i].secretKey[i2] = resp['results'][i]['secret-key'][i2];
              }
              // github.com/juju/juju/apiserver/params#Error
              if (resp['results'][i]['error']) {
                result.results[i].error = {};
                result.results[i].error.message = resp['results'][i]['error']['message'];
                result.results[i].error.code = resp['results'][i]['error']['code'];
                // github.com/juju/juju/apiserver/params#ErrorInfo
                if (resp['results'][i]['error']['info']) {
                  result.results[i].error.info = {};
                  // gopkg.in/macaroon.v2-unstable#Macaroon
                  result.results[i].error.info.macaroon = resp['results'][i]['error']['info']['macaroon'];
                  result.results[i].error.info.macaroonPath = resp['results'][i]['error']['info']['macaroon-path'];
                }
              }
            }
          }
        }
        return result;
      };

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }

  /**
    DisableUser disables one or more users.  If the user is already disabled,
    the action is considered a success.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          entities: []{
            tag: string
          }
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          results: []{
            error: {
              message: string,
              code: string,
              info: {
                macaroon: anything,
                macaroonPath: string
              }
            }
          }
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  disableUser(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#Entities
      if (args) {
        params = {};
        params['entities'] = [];
        args.entities = args.entities || [];
        for (let i = 0; i < args.entities.length; i++) {
          // github.com/juju/juju/apiserver/params#Entity
          if (args.entities[i]) {
            params['entities'][i] = {};
            params['entities'][i]['tag'] = args.entities[i].tag;
          }
        }
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'UserManager',
        request: 'DisableUser',
        version: 2,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#ErrorResults
        if (resp) {
          result = {};
          result.results = [];
          resp['results'] = resp['results'] || [];
          for (let i = 0; i < resp['results'].length; i++) {
            // github.com/juju/juju/apiserver/params#ErrorResult
            if (resp['results'][i]) {
              result.results[i] = {};
              // github.com/juju/juju/apiserver/params#Error
              if (resp['results'][i]['error']) {
                result.results[i].error = {};
                result.results[i].error.message = resp['results'][i]['error']['message'];
                result.results[i].error.code = resp['results'][i]['error']['code'];
                // github.com/juju/juju/apiserver/params#ErrorInfo
                if (resp['results'][i]['error']['info']) {
                  result.results[i].error.info = {};
                  // gopkg.in/macaroon.v2-unstable#Macaroon
                  result.results[i].error.info.macaroon = resp['results'][i]['error']['info']['macaroon'];
                  result.results[i].error.info.macaroonPath = resp['results'][i]['error']['info']['macaroon-path'];
                }
              }
            }
          }
        }
        return result;
      };

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }

  /**
    EnableUser enables one or more users.  If the user is already enabled, the
    action is considered a success.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          entities: []{
            tag: string
          }
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          results: []{
            error: {
              message: string,
              code: string,
              info: {
                macaroon: anything,
                macaroonPath: string
              }
            }
          }
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  enableUser(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#Entities
      if (args) {
        params = {};
        params['entities'] = [];
        args.entities = args.entities || [];
        for (let i = 0; i < args.entities.length; i++) {
          // github.com/juju/juju/apiserver/params#Entity
          if (args.entities[i]) {
            params['entities'][i] = {};
            params['entities'][i]['tag'] = args.entities[i].tag;
          }
        }
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'UserManager',
        request: 'EnableUser',
        version: 2,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#ErrorResults
        if (resp) {
          result = {};
          result.results = [];
          resp['results'] = resp['results'] || [];
          for (let i = 0; i < resp['results'].length; i++) {
            // github.com/juju/juju/apiserver/params#ErrorResult
            if (resp['results'][i]) {
              result.results[i] = {};
              // github.com/juju/juju/apiserver/params#Error
              if (resp['results'][i]['error']) {
                result.results[i].error = {};
                result.results[i].error.message = resp['results'][i]['error']['message'];
                result.results[i].error.code = resp['results'][i]['error']['code'];
                // github.com/juju/juju/apiserver/params#ErrorInfo
                if (resp['results'][i]['error']['info']) {
                  result.results[i].error.info = {};
                  // gopkg.in/macaroon.v2-unstable#Macaroon
                  result.results[i].error.info.macaroon = resp['results'][i]['error']['info']['macaroon'];
                  result.results[i].error.info.macaroonPath = resp['results'][i]['error']['info']['macaroon-path'];
                }
              }
            }
          }
        }
        return result;
      };

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }

  /**
    RemoveUser permanently removes a user from the current controller for each
    entity provided. While the user is permanently removed we keep it's
    information around for auditing purposes. TODO(redir): Add information
    about getting deleted user information when we add that capability.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          entities: []{
            tag: string
          }
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          results: []{
            error: {
              message: string,
              code: string,
              info: {
                macaroon: anything,
                macaroonPath: string
              }
            }
          }
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  removeUser(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#Entities
      if (args) {
        params = {};
        params['entities'] = [];
        args.entities = args.entities || [];
        for (let i = 0; i < args.entities.length; i++) {
          // github.com/juju/juju/apiserver/params#Entity
          if (args.entities[i]) {
            params['entities'][i] = {};
            params['entities'][i]['tag'] = args.entities[i].tag;
          }
        }
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'UserManager',
        request: 'RemoveUser',
        version: 2,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#ErrorResults
        if (resp) {
          result = {};
          result.results = [];
          resp['results'] = resp['results'] || [];
          for (let i = 0; i < resp['results'].length; i++) {
            // github.com/juju/juju/apiserver/params#ErrorResult
            if (resp['results'][i]) {
              result.results[i] = {};
              // github.com/juju/juju/apiserver/params#Error
              if (resp['results'][i]['error']) {
                result.results[i].error = {};
                result.results[i].error.message = resp['results'][i]['error']['message'];
                result.results[i].error.code = resp['results'][i]['error']['code'];
                // github.com/juju/juju/apiserver/params#ErrorInfo
                if (resp['results'][i]['error']['info']) {
                  result.results[i].error.info = {};
                  // gopkg.in/macaroon.v2-unstable#Macaroon
                  result.results[i].error.info.macaroon = resp['results'][i]['error']['info']['macaroon'];
                  result.results[i].error.info.macaroonPath = resp['results'][i]['error']['info']['macaroon-path'];
                }
              }
            }
          }
        }
        return result;
      };

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }

  /**
    ResetPassword resets password for supplied users by invalidating current
    passwords (if any) and generating new random secret keys which will be
    returned. Users cannot reset their own password.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          entities: []{
            tag: string
          }
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          results: []{
            tag: string,
            secretKey: []int,
            error: {
              message: string,
              code: string,
              info: {
                macaroon: anything,
                macaroonPath: string
              }
            }
          }
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  resetPassword(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#Entities
      if (args) {
        params = {};
        params['entities'] = [];
        args.entities = args.entities || [];
        for (let i = 0; i < args.entities.length; i++) {
          // github.com/juju/juju/apiserver/params#Entity
          if (args.entities[i]) {
            params['entities'][i] = {};
            params['entities'][i]['tag'] = args.entities[i].tag;
          }
        }
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'UserManager',
        request: 'ResetPassword',
        version: 2,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#AddUserResults
        if (resp) {
          result = {};
          result.results = [];
          resp['results'] = resp['results'] || [];
          for (let i = 0; i < resp['results'].length; i++) {
            // github.com/juju/juju/apiserver/params#AddUserResult
            if (resp['results'][i]) {
              result.results[i] = {};
              result.results[i].tag = resp['results'][i]['tag'];
              result.results[i].secretKey = [];
              resp['results'][i]['secret-key'] = resp['results'][i]['secret-key'] || [];
              for (let i2 = 0; i2 < resp['results'][i]['secret-key'].length; i2++) {
                result.results[i].secretKey[i2] = resp['results'][i]['secret-key'][i2];
              }
              // github.com/juju/juju/apiserver/params#Error
              if (resp['results'][i]['error']) {
                result.results[i].error = {};
                result.results[i].error.message = resp['results'][i]['error']['message'];
                result.results[i].error.code = resp['results'][i]['error']['code'];
                // github.com/juju/juju/apiserver/params#ErrorInfo
                if (resp['results'][i]['error']['info']) {
                  result.results[i].error.info = {};
                  // gopkg.in/macaroon.v2-unstable#Macaroon
                  result.results[i].error.info.macaroon = resp['results'][i]['error']['info']['macaroon'];
                  result.results[i].error.info.macaroonPath = resp['results'][i]['error']['info']['macaroon-path'];
                }
              }
            }
          }
        }
        return result;
      };

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }

  /**
    SetPassword changes the stored password for the specified users.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          changes: []{
            tag: string,
            password: string
          }
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          results: []{
            error: {
              message: string,
              code: string,
              info: {
                macaroon: anything,
                macaroonPath: string
              }
            }
          }
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  setPassword(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#EntityPasswords
      if (args) {
        params = {};
        params['changes'] = [];
        args.changes = args.changes || [];
        for (let i = 0; i < args.changes.length; i++) {
          // github.com/juju/juju/apiserver/params#EntityPassword
          if (args.changes[i]) {
            params['changes'][i] = {};
            params['changes'][i]['tag'] = args.changes[i].tag;
            params['changes'][i]['password'] = args.changes[i].password;
          }
        }
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'UserManager',
        request: 'SetPassword',
        version: 2,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#ErrorResults
        if (resp) {
          result = {};
          result.results = [];
          resp['results'] = resp['results'] || [];
          for (let i = 0; i < resp['results'].length; i++) {
            // github.com/juju/juju/apiserver/params#ErrorResult
            if (resp['results'][i]) {
              result.results[i] = {};
              // github.com/juju/juju/apiserver/params#Error
              if (resp['results'][i]['error']) {
                result.results[i].error = {};
                result.results[i].error.message = resp['results'][i]['error']['message'];
                result.results[i].error.code = resp['results'][i]['error']['code'];
                // github.com/juju/juju/apiserver/params#ErrorInfo
                if (resp['results'][i]['error']['info']) {
                  result.results[i].error.info = {};
                  // gopkg.in/macaroon.v2-unstable#Macaroon
                  result.results[i].error.info.macaroon = resp['results'][i]['error']['info']['macaroon'];
                  result.results[i].error.info.macaroonPath = resp['results'][i]['error']['info']['macaroon-path'];
                }
              }
            }
          }
        }
        return result;
      };

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }

  /**
    UserInfo returns information on a user.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          entities: []{
            tag: string
          },
          includeDisabled: bool
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          results: []{
            result: {
              username: string,
              displayName: string,
              access: string,
              createdBy: string,
              dateCreated: time,
              lastConnection: time,
              disabled: bool
            },
            error: {
              message: string,
              code: string,
              info: {
                macaroon: anything,
                macaroonPath: string
              }
            }
          }
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  userInfo(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#UserInfoRequest
      if (args) {
        params = {};
        params['entities'] = [];
        args.entities = args.entities || [];
        for (let i = 0; i < args.entities.length; i++) {
          // github.com/juju/juju/apiserver/params#Entity
          if (args.entities[i]) {
            params['entities'][i] = {};
            params['entities'][i]['tag'] = args.entities[i].tag;
          }
        }
        params['include-disabled'] = args.includeDisabled;
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'UserManager',
        request: 'UserInfo',
        version: 2,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#UserInfoResults
        if (resp) {
          result = {};
          result.results = [];
          resp['results'] = resp['results'] || [];
          for (let i = 0; i < resp['results'].length; i++) {
            // github.com/juju/juju/apiserver/params#UserInfoResult
            if (resp['results'][i]) {
              result.results[i] = {};
              // github.com/juju/juju/apiserver/params#UserInfo
              if (resp['results'][i]['result']) {
                result.results[i].result = {};
                result.results[i].result.username = resp['results'][i]['result']['username'];
                result.results[i].result.displayName = resp['results'][i]['result']['display-name'];
                result.results[i].result.access = resp['results'][i]['result']['access'];
                result.results[i].result.createdBy = resp['results'][i]['result']['created-by'];
                // time#Time
                result.results[i].result.dateCreated = resp['results'][i]['result']['date-created'];
                // time#Time
                result.results[i].result.lastConnection = resp['results'][i]['result']['last-connection'];
                result.results[i].result.disabled = resp['results'][i]['result']['disabled'];
              }
              // github.com/juju/juju/apiserver/params#Error
              if (resp['results'][i]['error']) {
                result.results[i].error = {};
                result.results[i].error.message = resp['results'][i]['error']['message'];
                result.results[i].error.code = resp['results'][i]['error']['code'];
                // github.com/juju/juju/apiserver/params#ErrorInfo
                if (resp['results'][i]['error']['info']) {
                  result.results[i].error.info = {};
                  // gopkg.in/macaroon.v2-unstable#Macaroon
                  result.results[i].error.info.macaroon = resp['results'][i]['error']['info']['macaroon'];
                  result.results[i].error.info.macaroonPath = resp['results'][i]['error']['info']['macaroon-path'];
                }
              }
            }
          }
        }
        return result;
      };

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }
}


const wrappers = require('../wrappers.js');
if (wrappers.wrapUserManager) {
  // Decorate the facade class in order to improve user experience.
  UserManagerV2 = wrappers.wrapUserManager(UserManagerV2);
}

module.exports = UserManagerV2;