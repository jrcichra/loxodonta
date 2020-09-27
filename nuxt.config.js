export default {
    modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios', 'moment'],
    components: true,
    moment: {
        timezone: true
    }, buildModules: [
        '@nuxtjs/fontawesome',
    ],
    server: {
        port: 3000,
        host: '0.0.0.0',
    },
    fontawesome: {
        icons: {
            solid: true,
            regular: true,
        }
    },
    // router: {
    //     base: '/dist/'
    // }
}
