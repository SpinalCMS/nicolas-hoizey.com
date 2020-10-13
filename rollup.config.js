import dotenv from 'dotenv';
dotenv.config();

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import entrypointHashmanifest from 'rollup-plugin-entrypoint-hashmanifest';
import path from 'path';

const config = require('./pack11ty.config.js');

const SRC_DIR = config.dir.src;
const ASSETS_DIR = config.dir.assets;
const DIST_DIR = config.dir.dist;

const JS_SRC = path.join(ASSETS_DIR, 'js');
const JS_DIST = path.join(DIST_DIR, 'js');
const HASH = path.join(SRC_DIR, '_data');

const plugins_critical = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  nodeResolve({ browser: true }),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
  }),
  process.env.NODE_ENV === 'production' && terser(),
  entrypointHashmanifest({
    manifestName: path.join(HASH, 'hashes_critical.json'),
  }),
];

const plugins_additional_iife = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.ALGOLIA_APP_ID': JSON.stringify(process.env.ALGOLIA_APP_ID),
    'process.env.ALGOLIA_READ_ONLY_API_KEY': JSON.stringify(
      process.env.ALGOLIA_READ_ONLY_API_KEY
    ),
    'process.env.ALGOLIA_INDEX_NAME': JSON.stringify(
      process.env.ALGOLIA_INDEX_NAME
    ),
  }),
  nodeResolve({ browser: true }),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
  }),
  process.env.NODE_ENV === 'production' && terser(),
  entrypointHashmanifest({
    manifestName: path.join(HASH, 'hashes_additional_iife.json'),
  }),
];

const plugins_additional_es = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.ALGOLIA_APP_ID': JSON.stringify(process.env.ALGOLIA_APP_ID),
    'process.env.ALGOLIA_READ_ONLY_API_KEY': JSON.stringify(
      process.env.ALGOLIA_READ_ONLY_API_KEY
    ),
    'process.env.ALGOLIA_INDEX_NAME': JSON.stringify(
      process.env.ALGOLIA_INDEX_NAME
    ),
  }),
  nodeResolve({ browser: true }),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
  }),
  process.env.NODE_ENV === 'production' && terser(),
  entrypointHashmanifest({
    manifestName: path.join(HASH, 'hashes_additional_es.json'),
  }),
];

export default [
  {
    input: path.join(JS_SRC, 'critical.js'),
    output: {
      dir: JS_DIST,
      entryFileNames: '[name]-[format].[hash].js',
      format: 'iife',
      name: 'critical',
      sourcemap: true,
    },
    plugins: plugins_critical,
  },
  {
    input: path.join(JS_SRC, 'additional.js'),
    output: {
      dir: JS_DIST,
      entryFileNames: '[name]-[format].[hash].js',
      format: 'iife',
      name: 'additional',
      sourcemap: true,
    },
    plugins: plugins_additional_iife,
  },
  {
    input: path.join(JS_SRC, 'additional.js'),
    output: {
      dir: JS_DIST,
      entryFileNames: '[name]-[format].[hash].js',
      format: 'es',
      sourcemap: true,
    },
    plugins: plugins_additional_es,
  },
  {
    input: path.join(JS_SRC, 'service-worker.js'),
    plugins: [
      nodeResolve(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      babel({
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['chrome >= 71'],
              },
              modules: false,
            },
          ],
        ],
      }),
      process.env.NODE_ENV === 'production' && terser(),
    ],
    output: {
      file: path.join(DIST_DIR, 'service-worker.js'),
      format: 'iife',
    },
  },
];
