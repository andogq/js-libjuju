/**
  Juju HighAvailability version 2.
  This facade is available on:
    Controllers
    Models

  NOTE: This file was generated on Tue, 01 Nov 2022 13:55:02 GMT using
  the Juju schema from  Juju juju-3.0 at the git SHA deb94d4.
  Do not manually edit this file.
*/

import { autoBind } from "../utils.js";
import type { JujuRequest } from "../../generator/interfaces";


interface ControllersChangeResult {
  error?: Error;
  result: ControllersChanges;
}

interface ControllersChangeResults {
  results: ControllersChangeResult[];
}

interface ControllersChanges {
  added: string[];
  converted: string[];
  maintained: string[];
  removed: string[];
}

interface ControllersSpec {
  constraints?: Value;
  'num-controllers': number;
  placement?: string[];
}

interface ControllersSpecs {
  specs: ControllersSpec[];
}

interface Error {
  code: string;
  info?: AdditionalProperties;
  message: string;
}

interface Value {
  'allocate-public-ip': boolean;
  arch: string;
  container: string;
  cores: number;
  'cpu-power': number;
  'instance-role': string;
  'instance-type': string;
  mem: number;
  'root-disk': number;
  'root-disk-source': string;
  spaces: string[];
  tags: string[];
  'virt-type': string;
  zones: string[];
}

interface AdditionalProperties {
  [key: string]: any;
}

/**
  HighAvailabilityAPI implements the HighAvailability interface and is the concrete
  implementation of the api end point.
*/
class HighAvailabilityV2 {
  static NAME: string = 'HighAvailability';
  static VERSION: number = 2;

  version: number;
  _transport: any;
  _info: any;

  constructor(transport, info) {
    this.version = 2;
    this._transport = transport;
    this._info = info;

    // Automatically bind all methods to instances.
    autoBind(this);
  }
  
  /**
    EnableHA adds controller machines as necessary to ensure the
    controller has the number of machines specified.
  */
  enableHA(params: ControllersSpecs): Promise<ControllersChangeResults> {
    return new Promise((resolve, reject) => {

      const req: JujuRequest = {
        type: 'HighAvailability',
        request: 'EnableHA',
        version: 2,
        params: params,
      };

      this._transport.write(req, resolve, reject);
    });
  }
  
}

export default HighAvailabilityV2;
