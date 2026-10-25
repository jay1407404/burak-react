// CRA fixes the checker at 2 GB; MUI 9's types need a larger heap.
const checkerPath = require.resolve("fork-ts-checker-webpack-plugin", {
  paths: [require.resolve("react-scripts/package.json")],
});
const ForkTsCheckerWebpackPlugin = require(checkerPath);

class TypeCheckerWithMoreMemory extends ForkTsCheckerWebpackPlugin {
  constructor(options = {}) {
    super({
      ...options,
      typescript: {
        ...options.typescript,
        memoryLimit: 4096,
      },
    });
  }
}

require.cache[checkerPath].exports = TypeCheckerWithMoreMemory;
