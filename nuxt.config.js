const config = require('./environment');

module.exports = {
  srcDir: 'src',
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  plugins: [
    '~/plugins/axios'
  ],
  buildModules: [
    '@nuxt/typescript-build'
  ],
  modules: [
    'nuxt-graphql-request',
    'nuxt-buefy',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  axios: {
  },
  css: [ '~/assets/sass/styles.sass' ],
  build: {
    extractCSS: true,
    extend (config, ctx) {
    }
  },
  graphql: {
    endpoint: `${config.baseUrl}/graphql`,
    AST: false,
    options: {},
  },
}
