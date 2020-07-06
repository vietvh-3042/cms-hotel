const { useBabelRc, override, addPostcssPlugins } = require("customize-cra");

module.exports = override(
  useBabelRc(),
  addPostcssPlugins([require("tailwindcss")])
);
