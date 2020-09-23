import React, {useContext} from 'react';
import Produkt from "../components/Produktet"
import {Comments} from '../components/common';
import {FirebaseContext} from '../components/firebase';
import {graphql} from 'gatsby';


const BourbonTemplate = (props) => {
    const {firebase} = useContext(FirebaseContext)
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
                {!!firebase &&
                <Comments firebase={firebase} bourbonId={props.data.bourbon.id} />
                
                }
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