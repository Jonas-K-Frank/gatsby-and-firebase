module.exports = {
  siteMetadata: {
    title: `The Bourbon Club`,
    description: `Her kan du læse om, og selv komme med din mening om forskellige bourbons`,
    author: `Jonas Frank`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'Bourbon',
        imagePath: 'imageURL',
      },
    },
    {
      resolve: 'gatsby-firesource',
      options: {
        credential: require("./firebase.json"),
        types: [
          {
            type: 'Bourbon',
            collection: 'bourbons',
            map: doc => ({
              navn: doc.navn,
              about: doc.about,
              alkoholprocent: doc.alkoholprocent,
              type: doc.type,
              imageURL: doc.imageURL,
              destillerier___NODE: doc.destilleri.id,
              regioner___NODE: doc.region.id,
            }),
          },
          {
            type: 'Destilleri',
            collection: 'destillerier',
            map: doc => ({
              destilleri: doc.destilleri
            }),
          },
          {
            type: 'Region',
            collection: 'regioner',
            map: doc => ({
              region: doc.region
            }),
          },
        ],
      },
    },
  ],
}
