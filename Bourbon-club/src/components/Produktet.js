import React from 'react'
import styled from 'styled-components';
import Img from 'gatsby-image'

const ProduktWrapper = styled.section`
    border: 1px solid #ddd;
    padding: 18px;
    background: #fff;
    margin-bottom: 8px;
    display: flex;

small{
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
        };

manchet{
    font-family: Arial, Helvetica, sans-serif;
    font-size: .8rem;
};

om{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    padding: 8px;
};
    
`;

const ProduktImageWrapper = styled.div`
        max-width: 150px;

        img{
            max-width: 150px;
        }
`;

const ProduktContentWrapper = styled.div`
        flex-grow: 1;
        padding-left: 10px;
`;


const Produkt = ({navn, billede, destilleri, alkoholprocent, region, type, about, children}) => {
    return (
    <ProduktWrapper>

        <ProduktImageWrapper>
            <Img fixed={billede}/>
        </ProduktImageWrapper>
        <ProduktContentWrapper>
       <h2>{navn} </h2>
       
       <manchet>
            Destilleri:<b> {destilleri} </b><br></br>
            
            Alkoholprocent: {alkoholprocent}<br></br>

            Type: {type} <br></br>

            Region: {region}<br></br>
        </manchet> 

        <om>{about}</om>

        <div>{children}</div>
        </ProduktContentWrapper>
    </ProduktWrapper>
    )
}
export default Produkt;