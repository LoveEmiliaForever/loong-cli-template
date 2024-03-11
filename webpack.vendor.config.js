const path = require('path')
const DashboardPlugin = require('webpack-dashboard/plugin')
const webpack = require('webpack')

const dllPath = path.join(__dirname, '/dist/dll')
const dllName = 'vendor'

module.exports = {
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
        new DashboardPlugin()
    ]
}
