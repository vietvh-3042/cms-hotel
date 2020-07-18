const {
	useBabelRc,
	override,
	addPostcssPlugins,
	removeModuleScopePlugin,
} = require("customize-cra");

module.exports = override(
	useBabelRc(),
	addPostcssPlugins([require("tailwindcss")]),
	removeModuleScopePlugin()
);
