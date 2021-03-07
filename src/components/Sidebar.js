import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../assets/reptile.png';
import {Price} from './Header'
import Cards from '../icons/cards'
import Tent from '../assets/tent.png'
import Shop from '../assets/shop.svg'

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
    display: flex;
    align-items: center;
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

const Legend = styled.ul`
    position: absolute;
    bottom: 1em;
    font-size: 12px;
    padding-left: 1.6em;
    li {
        list-style-type: none;
    }
`

const StyledCards = styled(Cards)`
    margin-right: 8px;
    margin-top: -2px;
`

const StyledShop = styled.img`
    margin-right: 8px;
    margin-left: -3px;
    width: 20px;
`

const StyledHome = styled.img`
    width: 21px;
    margin-right: 6px;
    margin-left: -3px;
    margin-top: -2px;
`

const Sidebar = ({ donations, activePage, setActivePage }) => {

    return (
        <StyledSidebar>
            <Header>
                <Logo src={logo} alt="logo" />
                <SidebarHeader>Rareptiles</SidebarHeader>
            </Header>
            <MenuItem active={activePage === 'marketplace'} onClick={() => setActivePage('marketplace')}>
                <StyledShop src={Shop} />
                Marketplace
            </MenuItem>
            <MenuItem active={activePage === 'collection'} onClick={() => setActivePage('collection')}>
                <StyledCards active={activePage === 'collection'} />
                Collection
            </MenuItem>
            <MenuItem active={activePage === 'shelter'} onClick={() => setActivePage('shelter')}>
                <StyledHome src={Tent} />
                Shelter
            </MenuItem>
            <Legend>
                Total Donations:
                <Price>{donations}</Price>
                <br/>
                <br/>
                <li>MEX: Extinct</li>
                <li>EX: Extinct in the Wild</li>
                <li>CR: Critically Endangered</li>
                <li>EN: Endangered</li>
                <li>VU: Vulnerable</li>
                <li>CO: Common</li>
            </Legend>
        </StyledSidebar>
    )

}

export default Sidebar
