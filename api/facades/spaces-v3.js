/**
  Juju Spaces version 3.
  This API facade is available on model connections.

  NOTE: this file has been generated by the generate command in js-libjuju
  on Fri 2018/11/09 14:32:38 UTC. Do not manually edit this file.
*/

'use strict';

const {createAsyncHandler} = require('../transform.js');

/**
  API defines the methods the Spaces API facade implements.
*/
class SpacesV3 {

  constructor(transport, info) {
    this._transport = transport;
    this._info = info;
    this.version = 3;
  }

  /**
    There is no documentation for this method.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          spaces: []{
            subnetTags: []string,
            spaceTag: string,
            public: bool,
            providerId: string
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
  createSpaces(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#CreateSpacesParams
      if (args) {
        params = {};
        params['spaces'] = [];
        args.spaces = args.spaces || [];
        for (let i = 0; i < args.spaces.length; i++) {
          // github.com/juju/juju/apiserver/params#CreateSpaceParams
          if (args.spaces[i]) {
            params['spaces'][i] = {};
            params['spaces'][i]['subnet-tags'] = [];
            args.spaces[i].subnetTags = args.spaces[i].subnetTags || [];
            for (let i2 = 0; i2 < args.spaces[i].subnetTags.length; i2++) {
              params['spaces'][i]['subnet-tags'][i2] = args.spaces[i].subnetTags[i2];
            }
            params['spaces'][i]['space-tag'] = args.spaces[i].spaceTag;
            params['spaces'][i]['public'] = args.spaces[i].public;
            params['spaces'][i]['provider-id'] = args.spaces[i].providerId;
          }
        }
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'Spaces',
        request: 'CreateSpaces',
        version: 3,
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
    There is no documentation for this method.

    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          results: []{
            name: string,
            subnets: []{
              cidr: string,
              providerId: string,
              providerNetworkId: string,
              providerSpaceId: string,
              vlanTag: int,
              life: string,
              spaceTag: string,
              zones: []string,
              status: string
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
  listSpaces(callback) {
    return new Promise((resolve, reject) => {
      const params = {};
      // Prepare the request to the Juju API.
      const req = {
        type: 'Spaces',
        request: 'ListSpaces',
        version: 3,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#ListSpacesResults
        if (resp) {
          result = {};
          result.results = [];
          resp['results'] = resp['results'] || [];
          for (let i = 0; i < resp['results'].length; i++) {
            // github.com/juju/juju/apiserver/params#Space
            if (resp['results'][i]) {
              result.results[i] = {};
              result.results[i].name = resp['results'][i]['name'];
              result.results[i].subnets = [];
              resp['results'][i]['subnets'] = resp['results'][i]['subnets'] || [];
              for (let i2 = 0; i2 < resp['results'][i]['subnets'].length; i2++) {
                // github.com/juju/juju/apiserver/params#Subnet
                if (resp['results'][i]['subnets'][i2]) {
                  result.results[i].subnets[i2] = {};
                  result.results[i].subnets[i2].cidr = resp['results'][i]['subnets'][i2]['cidr'];
                  result.results[i].subnets[i2].providerId = resp['results'][i]['subnets'][i2]['provider-id'];
                  result.results[i].subnets[i2].providerNetworkId = resp['results'][i]['subnets'][i2]['provider-network-id'];
                  result.results[i].subnets[i2].providerSpaceId = resp['results'][i]['subnets'][i2]['provider-space-id'];
                  result.results[i].subnets[i2].vlanTag = resp['results'][i]['subnets'][i2]['vlan-tag'];
                  // github.com/juju/juju/apiserver/params#Life
                  result.results[i].subnets[i2].life = resp['results'][i]['subnets'][i2]['life'];
                  result.results[i].subnets[i2].spaceTag = resp['results'][i]['subnets'][i2]['space-tag'];
                  result.results[i].subnets[i2].zones = [];
                  resp['results'][i]['subnets'][i2]['zones'] = resp['results'][i]['subnets'][i2]['zones'] || [];
                  for (let i3 = 0; i3 < resp['results'][i]['subnets'][i2]['zones'].length; i3++) {
                    result.results[i].subnets[i2].zones[i3] = resp['results'][i]['subnets'][i2]['zones'][i3];
                  }
                  result.results[i].subnets[i2].status = resp['results'][i]['subnets'][i2]['status'];
                }
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
    There is no documentation for this method.

    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error or null if the operation succeeded.
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  reloadSpaces(callback) {
    return new Promise((resolve, reject) => {
      const params = {};
      // Prepare the request to the Juju API.
      const req = {
        type: 'Spaces',
        request: 'ReloadSpaces',
        version: 3,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }
}


const wrappers = require('../wrappers.js');
if (wrappers.wrapSpaces) {
  // Decorate the facade class in order to improve user experience.
  SpacesV3 = wrappers.wrapSpaces(SpacesV3);
}

module.exports = SpacesV3;