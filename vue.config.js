/**
 * @author  huanxi
 * @date  2020/5/16 8:12 下午
 * @email 1355473748@qq.com
 */
module.exports = {
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    // 直接覆盖变量
                    'active-color': '#235acd',
                    'text-color': '#111',
                    'border-color': '#eee',
                    // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                    // hack: `true; @import "your-less-file-path.less";`,
                },
            },
        },
    },
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8080', //测试环境
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
};
