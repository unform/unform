import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import url from 'rollup-plugin-url';

const PACKAGE_ROOT_PATH = process.cwd();
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, 'lib/index.ts');
const pkg = require(path.join(PACKAGE_ROOT_PATH, 'package.json'));

function makeExternalPredicate(externalArr) {
  if (!externalArr.length) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return id => pattern.test(id);
}

function getExternal() {
  const external = Object.keys(pkg.peerDependencies || {});
  const allExternal = [...external, ...Object.keys(pkg.dependencies || {})];

  return makeExternalPredicate(allExternal);
}

export default {
  input: INPUT_FILE,
  external: getExternal(),
  output: [
    {
      file: path.resolve(PACKAGE_ROOT_PATH, 'dist/index.js'),
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: path.resolve(PACKAGE_ROOT_PATH, 'dist/index.es.js'),
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    url(),
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declarationDir: path.resolve(PACKAGE_ROOT_PATH, './typings'),
          declarationMap: true,
        },
        include: [path.resolve(PACKAGE_ROOT_PATH, './lib/**/*')],
      },
      rollupCommonJSResolveHack: true,
      useTsconfigDeclarationDir: true,
      objectHashIgnoreUnknownHack: true,
    }),
    commonjs(),
    terser(),
  ],
};
