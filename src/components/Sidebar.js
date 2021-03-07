import React from 'react'
import styled from 'styled-components'
import logo from '../assets/reptile.png';

const StyledSidebar = styled.div`
    width: 250px;
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
        background: #fadede;
        cursor: pointer;
    }
    font-weight: bold;
    ${p => p.active ? 'border-left: #de4e4e 6px solid;' : 'border-left: #de4e4e 0px solid;'}
`

const Logo = styled.img`
    width: 36px;
`

const SidebarHeader = styled.h1`
    margin: 0;
    font-size: 24px;
    display: inline;
    margin-left: 10px;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 1.5em;
`

const Sidebar = ({ activePage, setActivePage }) => {

    return (
        <StyledSidebar>
            <Header>
                <Logo src={logo} alt="logo" />
                <SidebarHeader>Rareptiles</SidebarHeader>
            </Header>
            <MenuItem active={activePage === 'marketplace'} onClick={() => setActivePage('marketplace')}>Marketplace</MenuItem>
            <MenuItem active={activePage === 'collection'} onClick={() => setActivePage('collection')}>Collection</MenuItem>
            <MenuItem active={activePage === 'shelter'} onClick={() => setActivePage('shelter')}>Shelter</MenuItem>
        </StyledSidebar>
    )

}

export default Sidebar
