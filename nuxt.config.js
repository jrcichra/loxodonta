export default {
    modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios', 'moment', '@nuxtjs/apollo',],
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
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: 'http://localhost:3001/graphql',
            }
        }
    }
    // router: {
    //     base: '/dist/'
    // }
}
