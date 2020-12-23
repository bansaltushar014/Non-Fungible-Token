import React, { useEffect, useState } from 'react';
import web3 from './helper.js';
import Contract from './contracts/Document.json';
import BuyToken from './components/buyTokenModal';

function App() {
  
  const [erc721Instance, seterc721Instance] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0)

  useEffect(() => {
    if(web3 == undefined){
      alert("Web3 not defined!");
    } else {
      setContractInstance();
    }
  },[]);

  useEffect(() => {
    if(erc721Instance!=0)
      totalSupplyfun();

  }, [erc721Instance])

  const setContractInstance = () => {
  
    const ABI = Contract.abi;
    // Ropsten Network
    // const walletContractAddress = response.data.networks[3].address;
    
    // Ganache 
    const ContractAddress = Contract.networks[5777].address;
    const instance = new web3.eth.Contract(ABI, ContractAddress);
    seterc721Instance(instance);
  }

  const totalSupplyfun = () => {
    erc721Instance.methods.totalSupply().call()
    .then(res => {
      setTotalSupply(res);
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      
      totalSupply : {totalSupply}
      <br/><br/>

      <BuyToken 
        erc721Instance = {erc721Instance}
      />
    </div>
  );
}

export default App;
