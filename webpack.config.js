const ENV = process.env.ENV
const isProd = ENV === 'production'
const sourceMapFlag = Boolean(process.env.SOURCEMAP) // Boolean
const sourceMapType = isProd ? 'source-map' : 'source-map' // source-map hidden-source-map nosources-source-map

const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const DashboardPlugin = require('webpack-dashboard/plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        index: isProd ? './src/index.js' : ['vue', 'vuex', 'vue-axios', 'vue-router', 'axios', './src/index.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProd ? './js/[name]@[chunkhash].js' : './js/[name].js',
        chunkFilename: isProd ? './js/[name]@async@[chunkhash].js' : './js/[name]@async.js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                // include: /src/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                sourceMap: sourceMapFlag,
                            },
                        },
                    }
                ]
            },
            {
                test: /\.ts$/,
                include: /src/,
                use: ['thread-loader', 'ts-loader']
            },
            {
                test: /\.js$/,
                include: /src/,
                enforce: 'post',
                use: [
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            "cacheDirectory": true,
                            sourceMap: sourceMapFlag
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: /src/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: sourceMapFlag
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: sourceMapFlag
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: path.join(__dirname, 'node_modules/element-plus'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: sourceMapFlag
                        }
                    }
                ]
            },
            {
                test: /\.(scss|sass)$/,
                // include: /src/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: sourceMapFlag
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: sourceMapFlag
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: sourceMapFlag
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|avif|webp)/,
                include: /src/,
                type: 'asset/resource',
                generator: {
                    filename: './assets/images/[name]@import.[ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)/,
                include: /src/,
                type: 'asset/resource',
                generator: {
                    filename: './assets/fonts/[name]@import.[ext]'
                }
            },
            {
                test: /\.(mp4|avi|mkv|flv)/,
                include: /src/,
                type: 'asset/resource',
                generator: {
                    filename: './assets/videos/[name]@import.[ext]'
                }
            },
            {
                test: /\.(mp3|wav|flac|aac|wma)/,
                include: /src/,
                type: 'asset/resource',
                generator: {
                    filename: './assets/audios/[name]@import.[ext]'
                }
            }
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\/src/,
                parallel: true,
                terserOptions: {
                    sourceMap: sourceMapFlag
                }
            }),
            new CssMinimizerPlugin({
                include: /\/src/,
                parallel: true
            })
        ]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.runtime.esm-bundler.js'
        },
        extensions: ['.js', '.vue']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name]@import.css',
            chunkFilename: './css/[name]@async.css'
        }),
        new VueLoaderPlugin(),
        new ESLintPlugin({
            overrideConfigFile: path.join(__dirname, '.eslintrc.js'),
            extensions: ['js', 'ts']
        }),
        isProd ? new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, '/dist/dll/manifest.json'))
        }) : null,
        new HtmlWebpackPlugin({
            title: 'my-web',
            filename: 'index.html',
            template: './src/template.html',
            favicon: './src/assets/images/loong.ico',
            dllPath: isProd ? './dll/vendor.js' : '',
            chunks: ['index']
        }),
        isProd ? new BundleAnalyzer() : null,
        new DashboardPlugin()
    ].filter(item => item !== null),
    devtool: sourceMapFlag ? sourceMapType : false,
    mode: ENV,
    devServer: {
        devMiddleware: {
            publicPath: '', // 所有输出文件的公共URL路径
        },
        static: {
            directory: path.join(__dirname, '/src/assets') // 告诉服务器从哪里提供间接请求的内容
        },
        compress: true, // 启用gzip压缩
        port: 7782 // 服务器端口号
    },
}