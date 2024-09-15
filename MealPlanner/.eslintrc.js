/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ["vuetify", "@vue/eslint-config-typescript", "./.eslintrc-auto-import.json"],
	rules: {
		"vue/multi-word-component-names": "off",
		indent: "off", // disable indentation rule
		"no-tabs": "off", // disable no-tabs rule
		quotes: "off",
		"comma-dangle": "off",
		semi: "off",
		"vue/html-indent": "off",
		"vue/script-indent": "off",
		"no-mixed-spaces-and-tabs": "off"
	}
};
