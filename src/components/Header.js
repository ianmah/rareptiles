import styled from 'styled-components'

export const Title = styled.h3`
    margin: 0;
    font-family: 'Shapiro';
    text-transform: uppercase;
`
export const Header = styled.h2`
    margin: 0 0 1em 0;
    font-family: 'Shapiro';
    text-transform: uppercase;
`

export const Price = styled.p`
    font-size: 22px;
    font-family: 'Shapiro';
    margin: 0;
    &::before {
        font-family: 'Fira Mono';
        font-weight: 700;
        content: "Ξ";
        margin-right: 3px;
    }
`