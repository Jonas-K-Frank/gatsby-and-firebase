const path = require('path');
exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;
    const bourbonTemplate = path.resolve('src/templates/bourbonTemplate.js');

    return graphql(`
    {
      allBourbon {
        edges {
          node {
            id
          }
        }
      }
    }
    `).then((result) => {
        if(result.errors){
            throw result.errors;
        }

        result.data.allBourbon.edges.forEach(bourbon => {
            createPage({
                path: `/bourbon/${bourbon.node.id}`,
                component: bourbonTemplate,
                context: {bourbonId: bourbon.node.id}
            })
        });
    })
}
