const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader
        },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve('postcss-loader'),
            options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebook/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                            flexbox: 'no-2009',
                        },
                        stage: 3,
                    }),
                ]
            },
        },
    ];
    if (preProcessor) {
        loaders.push({
            loader: require.resolve(preProcessor),
        });
    }
    return loaders;
};

const jsConfig = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
        presets: [
            "@babel/env"
        ]
    }
};

const postcssConfig = {
    test: cssRegex,
    exclude: cssModuleRegex,
    use: getStyleLoaders({
        importLoaders: 1,
    }),
};

const cssModulesConfig = {
    test: cssModuleRegex,
    use: getStyleLoaders({
        importLoaders: 1,
        modules: true,
        getLocalIdent: getCSSModuleLocalIdent,
    }),
};

const libConfig = {
    entry: './src/lib/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react-forms-lib-datetime.js',
        library: 'react-forms-lib-datetime',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    module: {
        rules: [ jsConfig ]
    },
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};

const exampleConfig = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js'
    },
    module: {
        rules: [ jsConfig, postcssConfig, cssModulesConfig ]
    },
    devServer: {
        compress: true,
        port: 9000
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "style.css"})
    ]
};

module.exports = [ libConfig, exampleConfig ];