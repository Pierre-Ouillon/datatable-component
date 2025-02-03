import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import jsx from 'rollup-plugin-jsx';
import babel from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({extensions: ['.js', '.jsx']}),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      jsx( {factory: 'React.createElement'} ),
      image()
    ],
  },
];