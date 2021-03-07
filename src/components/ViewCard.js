import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { Price } from './Header'
import { RARITY, RARITY_FULL } from '../constants'
import CardBack from '../assets/backing.png'
import cardData from '../assets/card-data.json'
import floreanaGiantTortoiseQR from '../qr_codes/Floreana_Giant_Tortoise_QR.png'
import mitchellsWaterMonitorQR from "../qr_codes/Mitchell's_Water_Monitor_QR.png"
import pacificBluetailSkinkQR from '../qr_codes/Pacific_Bluetail_Skink_QR.png'
import rubyEyedGreenPitviperQR from "../qr_codes/Ruby-eyed_Green_Pitviper_QR.png"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: #ffffffee;
    position: absolute;
    box-sizing: border-box;
    z-index: 100;
`

const Content = styled.div`
    margin: auto;
    text-align: center;
    overflow: hidden;
`

const StyledImg = styled.img`
    animation: spin 4s ease infinite;
    width: 500px;
    height: 450px;
    margin: 2em;
    object-fit: cover;
    box-shadow: 2px 2px 15px #e3e2e1;
    border-radius: 10px;
    overflow: hidden;
    z-index: 300;
`
const QrImg = styled.img`
    position: absolute;
    background-color:rgba(0, 0, 0, 0);
    bottom: 4px;
    right: 4px;
    width: 75px;
    height: 75px;
    margin: 1em
    object-fit: cover;
    overflow: hidden;
    z-index: 300;
`

const CardAnim = styled.div`
    position: relative;
    margin-top: 3em;
    .back {
        margin-top: -89%;
        opacity: 0;
    }

    &:hover {
        .back {
            animation: rotato 2.2s linear 1;
        }
        .front {
            animation: frontrotato 2.2s linear 1;
        }
    }

    @keyframes frontrotato {
        0%{
            transform: rotateY(0);
        }
        23%{
            opacity: 100;
        }
        25%{
            transform: rotateY(90deg);
        }
        75%{
            opacity: 0;
            transform: rotateY(90deg);
        }
        76%{            
            opacity: 100;
        }
        100%{
            transform: rotateY(0);
        }

    }

    @keyframes rotato {
        0%{
            transform: rotateY(0);
        }
        23%{
            opacity: 0;
        }
        25%{
            opacity: 100;
            transform: rotateY(90deg);
        }
        50%{
            transform: rotateY(0);
        }
        75%{
            opacity: 100;
            transform: rotateY(90deg);
        }
        76%{
            opacity: 0;
        }
        100%{
            transform: rotateY(0);
        }
    }
`

const Shine = styled.div`
    width: 600px;
    height: 500px;
    margin-top: -500px;
    z-index: 600;
    animation: shiny 3s linear infinite;
    transform: translateY(0);
    background: linear-gradient(to right, transparent 25%, #fff 50%, transparent 75%);
    background-repeat: no-repeat;
`

const StyledButton = styled(Button)`
    position: absolute;
    top: 0.75em;
    right: 0.75em;
    transform: translateY(0);
    z-index: 1000;
`

const StyledCard = styled.div`
    background: #fff;
    width: 570px;
    min-height: 730px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 2px 2px 15px #e3e2e1;
    margin: 5em auto;
    overflow: hidden;
    position: relative;
    padding-bottom: 2em;
`
const Name = styled.h2`
    font-family: 'Shapiro';
    font-size: 26px;
    text-transform: uppercase;
    margin: 0;
    margin-top: -20px;
    padding: 0 15px;
`

const ConservativeActions = styled.p`
    width: 570px;
    box-sizing: border-box;
    margin-top: -10px;
    padding: 0 30px 10px 30px;
`

const ConservativeActionsTitle = styled.h4`
    width: 570px;
    box-sizing: border-box;
    padding: 0 4px;
    font-size: 16px;
`

const Serial = styled.div`
    font-size: 10px;
    position: absolute;
    bottom: 1.2em;
    right: 1.2em;
    color: #ccc;
`

const qrImageMap = {
    "floreanaGiantTortoiseQR": floreanaGiantTortoiseQR,
    "mitchellsWaterMonitor": mitchellsWaterMonitorQR,
    "pacificBluetailSkinkQR": pacificBluetailSkinkQR,
    "rubyEyedGreenPitviperQR": rubyEyedGreenPitviperQR
}

const listReptile = (tokenId, salePrice) => {
    window.reptileContract.methods
        .setForSale(tokenId, salePrice)
        .send({ from: window.account })
        .once('receipt', receipt => {
            console.log('Listing complete', receipt)
        })
}

const ViewCard = ({ setViewCard, item }) => {
    const {species, name, uri, rarity} = item
    const [sellAmount, setSellAmount] = useState('')

    const confirmSell = () => {
        const numSell = parseFloat(sellAmount)
        if (numSell) {
            const amountSell = window.web3.utils.toWei(numSell.toString(), "ether")
            listReptile(item.id, amountSell)
        }

    }

    const adopt = () => {
        window.reptileContract.methods
            .mint(species, name, uri, rarity)
            .send({ from: window.account })
            .once('receipt', receipt => {
                console.log('mint complete', receipt)
                setViewCard(false)
            })
    }

    return (
        <Container>
            <Content>
                <StyledCard>
                    <CardAnim>
                        <div className="front">
                            <StyledImg src={item.uri} alt={item.name} />
                            <Shine/>
                        </div>
                        <div className="back">
                            <StyledImg src={CardBack} alt={item.name} />
                            <Shine/>
                        </div>
                    </CardAnim>
                    <StyledButton onClick={() => setViewCard()} >Close</StyledButton>
                    <Serial>
                        {item.id && `#${item.id}`} 
                    </Serial>
                    <br/>
                    <Name>{item.name}</Name>
                    {RARITY[item.rarity]}: {RARITY_FULL[item.rarity]}
                    <br/>
                    Population Trend: {cardData[item.species].populationTrend}
                    <br/>
                    Systems: {cardData[item.species].systems}
                    <br/>
                    Realm: {cardData[item.species].realm}
                    <br/>
                    <br/>
                    {
                        cardData[item.species].conservativeActions !== "" && 
                        <> 
                            <ConservativeActionsTitle>Conservative Actions</ConservativeActionsTitle>
                            <ConservativeActions>{cardData[item.species].conservativeActions}</ConservativeActions>
                        </>
                    }
                    {
                        !item.id && item.id !== 0 && <Button onClick={adopt}>Adopt</Button>
                    }
                    {
                        
                        item.forSale && <>
                            <Price>{item.salePrice}</Price>
                            <br/>
                            <Button onClick={adopt}>Buy</Button>
                        </>
                    }
                    {
                        cardData[item.species].arPicName &&
                        <QrImg src={qrImageMap[cardData[item.species].arPicName]} alt={item.name + " QR code"} />

                    }
                    {
                        item.wanttosell && <div>
                        Sell price:
                        <input value={sellAmount} onChange={e => setSellAmount(e.target.value)} />
                        <br/>
                        <br/>
                        <Button onClick={confirmSell}>Confirm</Button>
                        </div>
                        
                    }
                </StyledCard>
            </Content>
        </Container>
    )
}

export default ViewCard