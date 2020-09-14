const path = require('path');
exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;
    const albumTemplate = path.resolve('src/templates/albumTemplate.js');

    return graphql(`
    {
        allAlbum {
          edges {
            node {
              genre
              review
              title
              year
              artist {
                name
                id
              }
            }
          }
        }
      }
    `).then((result) => {
        if(result.errors){
            throw result.errors;
        }

        result.data.allAlbum.edges.forEach(album => {
            createPage({
                path: `/album/${album.node.id}`,
                component: albumTemplate,
                context: 'album.node'
            })
        });
    })
}
