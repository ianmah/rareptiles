import Web3 from 'web3';
import Reptile from '../abis/Reptile.json';

export const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        window.alert('Non-Ethereum browser detected');
    }
};

export const loadReptileContract = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    window.account = accounts[0]

    const networkId = await web3.eth.net.getId();
    const itemNetworkData = Reptile.networks[networkId];
    if (itemNetworkData) {
      const abi = Reptile.abi;
      const address = itemNetworkData.address;
      const reptileContract = new web3.eth.Contract(abi, address);

      return reptileContract

    } else {
      window.alert(`Smart contract not on network`);
    }
  };