# Copyright 2018 Canonical Ltd.
# Licensed under the LGPLv3, see LICENCE.txt file for details.

import json
import os
import shutil
import tempfile
from unittest import TestCase

from . import helpers
import generator


class TestGenerator(TestCase):

    tests = [{
        'about': 'invalid schema',
        'schema': 'invalid',
        'want_error': 'provided schema does not contain a list of facades',
    }, {
        'about': 'invalid facade',
        'schema': ['invalid'],
        'want_error': 'schema for facades is not valid',
    }, {
        'about': 'empty facade list',
        'schema': [],
    }, {
        'about': 'single simple facade',
        'schema': [{
            'Name': 'Pinger',
            'Version': 42,
            'Schema': {
                'type': 'object',
                'properties': {
                    'Ping': {'type': 'object'},
                    'Stop': {'type': 'object'}
                },
            },
        }],
        'want_files': {
            'pinger-v42.js': '''
/**
  Juju Pinger API facade version 42.
  This file has been generated by the generate command in js-libjuju.
*/

'use strict';


class PingerV42 {

  constructor(transport, info) {
    this._transport = transport;
    this._info = info;
    this.version = 42;
  }

  /**
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error or null if the operation succeeded.
  */
  ping(callback) {
    const params = {};
    // Prepare the request to the Juju API.
    const req = {
      type: 'Pinger',
      request: 'Ping',
      version: 42,
      params: params
    };
    // Send the request to the server.
    this._transport.write(req, (err, resp) => {
      if (!callback) {
        return;
      }
      if (err) {
        callback(err, {});
        return;
      }
      callback(null, {});
    });
  }

  /**
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error or null if the operation succeeded.
  */
  stop(callback) {
    const params = {};
    // Prepare the request to the Juju API.
    const req = {
      type: 'Pinger',
      request: 'Stop',
      version: 42,
      params: params
    };
    // Send the request to the server.
    this._transport.write(req, (err, resp) => {
      if (!callback) {
        return;
      }
      if (err) {
        callback(err, {});
        return;
      }
      callback(null, {});
    });
  }
}


const wrappers = require('../wrappers.js');
if (wrappers.wrapPinger) {
  PingerV42 = wrappers.wrapPinger(PingerV42);
}

module.exports = PingerV42;'''[1:]
        },
    }]

    def test_generate(self):
        # The generate command generates API facades.
        for test in self.tests:
            with self.subTest(test['about']):
                self.check(
                    test.get('schema', ''),
                    test.get('want_files', {}),
                    test.get('want_error', ''),
                )

    def check(self, schema, want_files, want_error):
        # Create the schema file.
        dump = json.dumps(schema)
        with tempfile.NamedTemporaryFile(delete=False) as f:
            f.write(dump.encode('utf-8'))
        self.addCleanup(os.remove, f.name)
        # Set up a directory for the generated code.
        out = tempfile.mkdtemp()
        self.addCleanup(shutil.rmtree, out)
        # Execute the command.
        with helpers.maybe_raises(SystemExit) as ctx:
            generator.generate([f.name, out])
        # Check errors.
        if want_error:
            self.assertIsNotNone(ctx.exc)
            self.assertEqual(str(ctx.exc), want_error)
            return
        self.assertIsNone(ctx.exc)
        # Check generated code.
        self.assertEqual(os.listdir(out), sorted(want_files.keys()))
        for filename, want_code in want_files.items():
            with open(os.path.join(out, filename)) as f:
                got_code = f.read()
            self.assertEqual(got_code, want_code, got_code)
