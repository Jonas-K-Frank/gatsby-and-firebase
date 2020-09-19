import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SektionsKomponent from "../components/Produktet"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = (props) => {
  console.log(props);
  return (
  <Layout>
  {props.data.allBourbon.edges.map(edge => (
  <SektionsKomponent key={edge.node.id}>
    <h2>
{edge.node.navn} - <small>{edge.node.destillerier.destilleri}</small>
    </h2>
    <div>
      {edge.node.about}
      </div>
      <Link to={`/bourbon/${edge.node.id}`}>
      Hvad synes du?
      </Link>
  </SektionsKomponent>
))}  
  </Layout>
);
}

 export const query = graphql`
 {
  allBourbon {
    edges {
      node {
        about
        alkoholprocent
        id
        destillerier {
          destilleri
        }
        navn
        regioner {
          region
        }
        type
      }
    }
  }
}
`; 

export default IndexPage
