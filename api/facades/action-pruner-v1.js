/**
  Juju ActionPruner version 1.
  This API facade is available on model connections.

  NOTE: this file has been generated by the generate command in js-libjuju
  on Fri 2018/11/09 14:32:38 UTC. Do not manually edit this file.
*/

'use strict';

const {createAsyncHandler} = require('../transform.js');

/**
  There is no documentation for this facade.
*/
class ActionPrunerV1 {

  constructor(transport, info) {
    this._transport = transport;
    this._info = info;
    this.version = 1;
  }

  /**
    ModelConfig returns the current model's configuration.

    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          config: map[string]anything
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  modelConfig(callback) {
    return new Promise((resolve, reject) => {
      const params = {};
      // Prepare the request to the Juju API.
      const req = {
        type: 'ActionPruner',
        request: 'ModelConfig',
        version: 1,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#ModelConfigResult
        if (resp) {
          result = {};
          // github.com/juju/juju/apiserver/params#ModelConfig
          result.config = {};
          resp['config'] = resp['config'] || {};
          for (let k in resp['config']) {
            result.config[k] = resp['config'][k];
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
    There is no documentation for this method.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          maxHistoryTime: int,
          maxHistoryMb: int
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error or null if the operation succeeded.
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  prune(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#ActionPruneArgs
      if (args) {
        params = {};
        // time#Duration
        params['max-history-time'] = args.maxHistoryTime;
        params['max-history-mb'] = args.maxHistoryMb;
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'ActionPruner',
        request: 'Prune',
        version: 1,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }

  /**
    WatchForModelConfigChanges returns a NotifyWatcher that observes changes to
    the model configuration. Note that although the NotifyWatchResult
    contains an Error field, it's not used because we are only returning a
    single watcher, so we use the regular error return.

    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          notifywatcherid: string,
          error: {
            message: string,
            code: string,
            info: {
              macaroon: anything,
              macaroonPath: string
            }
          }
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  watchForModelConfigChanges(callback) {
    return new Promise((resolve, reject) => {
      const params = {};
      // Prepare the request to the Juju API.
      const req = {
        type: 'ActionPruner',
        request: 'WatchForModelConfigChanges',
        version: 1,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#NotifyWatchResult
        if (resp) {
          result = {};
          result.notifywatcherid = resp['NotifyWatcherId'];
          // github.com/juju/juju/apiserver/params#Error
          if (resp['error']) {
            result.error = {};
            result.error.message = resp['error']['message'];
            result.error.code = resp['error']['code'];
            // github.com/juju/juju/apiserver/params#ErrorInfo
            if (resp['error']['info']) {
              result.error.info = {};
              // gopkg.in/macaroon.v2-unstable#Macaroon
              result.error.info.macaroon = resp['error']['info']['macaroon'];
              result.error.info.macaroonPath = resp['error']['info']['macaroon-path'];
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
if (wrappers.wrapActionPruner) {
  // Decorate the facade class in order to improve user experience.
  ActionPrunerV1 = wrappers.wrapActionPruner(ActionPrunerV1);
}

module.exports = ActionPrunerV1;