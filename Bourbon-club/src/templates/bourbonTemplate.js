import React from 'react';
import Layout from "../components/layout"
import Produkt from "../components/Produktet"


const BourbonTemplate = (props) => {
    console.log(props);
    return (
        <Layout>
            <Produkt
                navn={props.pageContext.navn}
                destilleri={props.pageContext.destillerier.destilleri}
                alkoholprocent={props.pageContext.alkoholprocent}
                region={props.pageContext.regioner.region}
                type={props.pageContext.type}
                about={props.pageContext.about}/>
        </Layout>
    )
}

export default BourbonTemplate