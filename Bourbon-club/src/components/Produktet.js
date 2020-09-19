import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.section`
    border: 1px solid #ddd;
    padding: 18px;
    background: #fff;
    margin-bottom: 8px;

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
const Produkt = ({navn, destilleri, alkoholprocent, region, type, about, children}) => {
    return (
    <Wrapper>
       <h2>{navn} </h2>
       
       <manchet>
            Destilleri:<b> {destilleri} </b><br></br>
            
            Alkoholprocent: {alkoholprocent}<br></br>

            Type: {type} <br></br>

            Region: {region}<br></br>
        </manchet> 

        <om>{about}</om>

        <div>{children}</div>
    </Wrapper>
    )
}
export default Produkt;