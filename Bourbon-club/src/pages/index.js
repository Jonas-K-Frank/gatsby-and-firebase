import React from "react"
import { Link, graphql } from "gatsby"

import Produkt from "../components/Produktet"
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
  return (
  <section>
  {props.data.allBourbon.edges.map(edge => (
  <Produkt 
    billede={edge.node.localImage.childImageSharp.fixed}
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
  </section>
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
        localImage {
          childImageSharp {
            fixed(width: 150){
              ...GatsbyImageSharpFixed
            }
          }
        }
        navn
        destillerier {
          destilleri
        }
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
