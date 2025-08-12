import fs from 'fs';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const isBuild = process.env.build === 'true';
const isRelease = process.env.release === 'true';
const emitTypes = process.env.types === 'true';

const BANNER_TYPES = `// Types for animate0.js ${pkg.version}\n`;
const BANNER = `/*! animate0.js v${pkg.version} | MIT License */`;

/**
 * Minimal helper to run tsc to emit declarations from JSDoc JS.
 */
import { spawnSync } from 'child_process';

function pluginTypes() {
  return {
    name: 'emit-types',
    buildEnd() {
      if (!emitTypes) return;
      const res = spawnSync(process.execPath, ['node_modules/typescript/bin/tsc', '-p', 'tsconfig.json'], {
        stdio: 'inherit',
      });
      if (res.status !== 0) {
        this.error('Type generation failed');
      }
      // Ensure a single entry types/index.d.ts that re-exports the public API
      const typesEntry = path.join('types', 'index.d.ts');
      const exportLine = `export * from './src/animate0.js';\n`;
      const content = `// Type entry for animate0.js ${pkg.version}\n` + exportLine;
      fs.mkdirSync('types', { recursive: true });
      fs.writeFileSync(typesEntry, content, 'utf8');
    },
  };
}

const basePlugins = [
  resolve({ browser: true }),
  commonjs(),
  replace({
    preventAssignment: true,
    values: {
      __packageVersion__: JSON.stringify(pkg.version),
    },
  }),
  babel({
    babelHelpers: 'bundled',
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { esmodules: true },
          modules: false,
        },
      ],
    ],
    extensions: ['.js'],
    exclude: 'node_modules/**',
  }),
  filesize(),
  pluginTypes(),
];

const input = 'src/animate0.js';

const configs = [
  // ESM
  {
    input,
    output: { file: 'lib/animate0.esm.js', format: 'esm', banner: BANNER, sourcemap: true },
    plugins: basePlugins,
  },
  {
    input,
    output: { file: 'lib/animate0.esm.min.js', format: 'esm', banner: BANNER, sourcemap: true },
    plugins: [...basePlugins, terser()],
  },
  // UMD
  {
    input,
    output: { file: 'lib/animate0.umd.js', format: 'umd', name: 'animate0', banner: BANNER, sourcemap: true },
    plugins: basePlugins,
  },
  {
    input,
    output: { file: 'lib/animate0.umd.min.js', format: 'umd', name: 'animate0', banner: BANNER, sourcemap: true },
    plugins: [...basePlugins, terser()],
  },
  // IIFE
  {
    input,
    output: { file: 'lib/animate0.iife.js', format: 'iife', name: 'animate0', banner: BANNER, sourcemap: true },
    plugins: basePlugins,
  },
  {
    input,
    output: { file: 'lib/animate0.iife.min.js', format: 'iife', name: 'animate0', banner: BANNER, sourcemap: true },
    plugins: [...basePlugins, terser()],
  },
  // CJS
  {
    input,
    output: { file: 'lib/animate0.cjs', format: 'cjs', banner: BANNER, sourcemap: true },
    plugins: basePlugins,
  },
  {
    input,
    output: { file: 'lib/animate0.min.cjs', format: 'cjs', banner: BANNER, sourcemap: true },
    plugins: [...basePlugins, terser()],
  },
];

export default configs;


