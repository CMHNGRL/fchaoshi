const path = require('path')
const { defineConfig } = require('@vue/cli-service')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: config => {

        config.module.rules.delete('svg')
        const svgRule = config.module.rule('svg-smart')
        svgRule.test(/\.svg$/)
            .include
            .add(resolve('src/icons/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },
    // devServer: {
    //     proxy: {
    //         '/zbdl': {
    //             target: 'http://localhost:8000',
    //             pathRewrite: { '^/zbdl': '' },
    //             ws: false,
    //             changeOrigin: true
    //         },
    //     }
    // }
})