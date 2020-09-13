import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = (props) => {
  console.log(props);
  return(
  <Layout>
{props.data.allAlbum.edges.map(edges => (
  <div key={edges.node.id}>
    <h2>
      {edges.node.title}
    </h2>
  </div>
))}
  </Layout>
);
}

export const query = graphql`
{
  allAlbum {
    edges {
      node {
        id
        review
        year
        genre
        artist {
          name
        }
      }
    }
  }
}
`;

export default IndexPage
