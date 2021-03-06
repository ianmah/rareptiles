import React from 'react'
import styled from 'styled-components'

const StyledSidebar = styled.div`
    min-width: 220px;
    float: left;
    height: 100vh;
    background: #fff;
    box-sizing: border-box;
    border-right: #e3e2e1 2px solid;
`

const MenuItem = styled.a`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: block;
    transition: all 200ms ease;
    &:hover {
        background: #fff4de;
        cursor: pointer;
    }
    font-weight: bold;
    ${p => p.active ? 'border-left: #ffbb78 6px solid;' : 'border-left: #ffbb78 0px solid;'}
`

const Sidebar = ({ activePage, setActivePage }) => {

    return (
        <StyledSidebar>
            <h1>Rareptiles</h1>
            <MenuItem active={activePage === 'home'} onClick={() => setActivePage('home')}>Home</MenuItem>
            <MenuItem active={activePage === 'marketplace'} onClick={() => setActivePage('marketplace')}>Marketplace</MenuItem>
            <MenuItem active={activePage === 'collection'} onClick={() => setActivePage('collection')}>Collection</MenuItem>
            <MenuItem active={activePage === 'shelter'} onClick={() => setActivePage('shelter')}>Shelter</MenuItem>
        </StyledSidebar>
    )

}

export default Sidebar
