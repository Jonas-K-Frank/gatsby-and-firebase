import styled from 'styled-components'

export const Button = styled.button`
    padding: 8px 16px;
    background: rebeccapurple;
    color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: none;
    white-space: nowrap;
    cursor: pointer;
    ${props => props.block ? 'display: block; width: 100%;' : ''}

    &:hover {
        background:indigo;
        border: 1px solid #fff;
    }
    &:active {
        border: 1px solid #fff;
    }
`;