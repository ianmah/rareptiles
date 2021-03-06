import React from 'react'
import styled from 'styled-components'

const StyledSidebar = styled.div`
    width: 220px;
    float: left;
    height: 100vh;
    background: #fff;
    box-sizing: border-box;
    border-right: #e3e2e1 2px solid;
`

const MenuItem = styled.a`
    width: 100%;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    display: block;
    transition: all 200ms ease;
    &:hover {
        background: #eee;
    }
`

const Sidebar = ({ setActivePage }) => {

    return (
        <StyledSidebar>
            <h1>Rareptiles</h1>
            <MenuItem onClick={() => setActivePage('home')}>Home</MenuItem>
            <MenuItem onClick={() => setActivePage('marketplace')}>Marketplace</MenuItem>
            <MenuItem onClick={() => setActivePage('collection')}>Collection</MenuItem>
        </StyledSidebar>
    )

}

export default Sidebar
