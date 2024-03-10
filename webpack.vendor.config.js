const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const DashboardPlugin = require('webpack-dashboard/plugin')
const SizePlugin = require('size-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const webpack = require('webpack')

const dllPath = path.join(__dirname, '/dist/dll')
const dllName = 'vendor'

module.exports = smp.wrap({
    entry: ['vue', 'vuex', 'vue-axios', 'vue-router', 'axios'],
    output: {
        path: dllPath,
        filename: 'vendor.js',
        library: dllName
    },
    mode: 'production',
    plugins: [
        new webpack.DllPlugin({
            name: dllName,
            path: path.join(__dirname, 'dist/dll/manifest.json')
        }),
        new webpack.ids.HashedModuleIdsPlugin(),
        // new BundleAnalyzerPlugin(),
        new SizePlugin(),
        new DashboardPlugin()
    ]
})
