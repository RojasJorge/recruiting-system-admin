const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
const withImages = require('next-images');
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs');
const path = require('path');

const themeVariables = lessToJS(
	fs.readFileSync(path.resolve(__dirname, './assets/css/antd-custom.less'), 'utf8')
);

/** fix: prevents error when .less files are required by node */
if (typeof require !== 'undefined') {
	require.extensions['.less'] = file => {}
}

module.exports =
	withLess(
		withCSS(
			withSass(
				withImages({
					env: {
						APP_TITLE: ' | Umana admin',
						ENVIRONMENT: 'develop',
						API_URL: 'http://localhost:3026/api/v1',
						// API_URL: 'http://128.199.162.22:3026/api/v1'
					},
					lessLoaderOptions: {
						javascriptEnabled: true,
						modifyVars: themeVariables // make your antd custom effective
					},
					esModule: true,
					webpack(config, options) {
						config.module.rules.push({
							test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
							use: {
								loader: 'url-loader',
								options: {
									limit: 100000
								}
							}
						});
						return config;
					}
				})
			)
		)
	);
