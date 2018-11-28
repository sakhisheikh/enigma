module.exports = {
  plugins: [
    `gatsby-transformer-sharp`,
    {
      resolve: '@wapps/gatsby-plugin-material-ui',
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Enigma App',
        short_name: 'Engima App',
        start_url: '/',
        background_color: '#08AEEA',
        theme_color: '#2AF598',
        display: 'minimal-ui',
        icons: [
          {
            src: `/static/favicon.ico`,
            sizes: `192x192`,
          },
        ],
      },
    },
    'gatsby-plugin-offline',
  ],
  pathPrefix: "/enigma",
}