import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = (props) => {
  console.log(props);
  return (
  <Layout>
 {props.data.allAlbum.edges.map(edge => (
  <div key={edge.node.id}>
    <h2>
{edge.node.title} - <small>{edge.node.artist.name}</small>
    </h2>
    <div>
      {edge.node.review}
      </div>
      <Link to={`/album/${edge.node.id}`}>
      Hvad synes du?
      </Link>
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
`;

export default IndexPage
