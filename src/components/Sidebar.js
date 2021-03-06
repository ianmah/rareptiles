import React from 'react'
import styled from 'styled-components'

const StyledSidebar = styled.div`
    width: 220px;
    float: left;
    height: 100vh;
    background: #fff;
    box-sizing: border-box;
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

const Sidebar = () => {

    return (
        <StyledSidebar>
            <h1>Rareptiles</h1>
            <MenuItem>Marketplace</MenuItem>
            <MenuItem>Collection</MenuItem>
        </StyledSidebar>
    )

}

export default Sidebar
