import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Produkt from "../components/Produktet"
/* import Image from "../components/image"
import SEO from "../components/seo" */

import styled from 'styled-components'

const LinkButton = styled.div`
  text-align: right;

  a{
    padding: 8px;
    background: rebeccapurple;
    color: #fff;
    border-radius: 3px;
    text-decoration: none;

    &:hover{
      background: indigo;
    }
  }
`;

const IndexPage = (props) => {
  console.log(props);
  return (
  <Layout>
  {props.data.allBourbon.edges.map(edge => (
  <Produkt 
    navn={edge.node.navn}
    destilleri={edge.node.destillerier.destilleri}
    alkoholprocent={edge.node.alkoholprocent}
    type={edge.node.type}
    region={edge.node.regioner.region}
    about={edge.node.about}
    key={edge.node.id}>
  <LinkButton>
    <Link to={`/bourbon/${edge.node.id}`}>
      Hvad synes du?
    </Link>
  </LinkButton>
  </Produkt>
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
