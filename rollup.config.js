import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import url from 'rollup-plugin-url';

import pkg from './package.json';

export default {
  input: 'lib/index.ts',
  external: ['react', 'react-dom', 'yup'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external({
      includeDependencies: false,
    }),
    url(),
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    commonjs(),
    terser(),
  ],
};
