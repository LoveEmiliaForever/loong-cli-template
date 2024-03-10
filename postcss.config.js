module.exports = {
    // 从前往后执行
    plugins: [
        require('stylelint'),
        // require('autoprefixer'), // postcss-preset-env内置了autoprefixer
        require('postcss-preset-env'),
        require('postcss-reporter')
    ]
}