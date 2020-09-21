import React from 'react';
import Layout from "../components/layout"
import Produkt from "../components/Produktet"
import {graphql} from 'gatsby'


const BourbonTemplate = (props) => {
    console.log(props.data);
    return (
        <section>
            <Produkt
                billede={props.data.bourbon.localImage.childImageSharp.fixed}
                navn={props.data.bourbon.navn}
                destilleri={props.data.bourbon.destillerier.destilleri}
                alkoholprocent={props.data.bourbon.alkoholprocent}
                region={props.data.bourbon.regioner.region}
                type={props.data.bourbon.type}
                about={props.data.bourbon.about}/>
        </section>
    )
}

export const query = graphql`
    query BourbonQuery($bourbonId: String!){
            bourbon(id: {eq: $bourbonId}){
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
`;
export default BourbonTemplate