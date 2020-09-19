import React from 'react';
import Layout from "../components/layout"
import SektionsKomponent from "../components/Produktet"


const BourbonTemplate = (props) => {
    console.log(props);
    return (
        <Layout>
            <SektionsKomponent>
                <h2>
                {props.pageContext.navn} <small>- {props.pageContext.destillerier.destilleri}</small> 
                </h2>
                <small>Alkoholprocent: {props.pageContext.alkoholprocent}</small><br></br>
    <small>Type: {props.pageContext.type}</small> <br></br><small>Region: {props.pageContext.regioner.region}</small>
    <p>
        {props.pageContext.about}
    </p>
            </SektionsKomponent>
        </Layout>
    )
}

export default BourbonTemplate