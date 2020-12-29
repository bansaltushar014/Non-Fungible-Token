import React, { Component } from 'react';
import metamaskAccount from './subcomponents/metamask';

const TransferToken = (props) => {

    const transferTokenFun = async (e) => {
        e.preventDefault();

        const _from = e.target.sender.value;
        const _to = e.target.receiver.value;
        const _tokenId = e.target.tokenId.value;

        await metamaskAccount()
        .then(account => {
            props.erc721Instance.methods.safeTransferFrom(_from, _to, _tokenId)
            .send({
                from: account,
                gas: 800000 
           })
           .then(res => {
            console.log(res);
           })
           .catch(err => {
            console.log(err);
           })
        })

    }

    return (<div className="card">
        <div className="card-content">
            <b> Transfer token </b> <br/><br/>
            <form className="col s12" onSubmit={transferTokenFun} >
                <div className="row">
                    <div className="input-field col s12">
                        <input id="sender" type="text" required className="validate" />
                        <label htmlFor="sender">From Address</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="receiver" type="text" required className="validate" />
                        <label htmlFor="receiver">To Address</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="tokenId" type="text" required className="validate" />
                        <label htmlFor="tokenId">Token Id</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <div className="waves-effect waves-light btn">
                            <input id="submit" type="submit" className="validate" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>);
}

export default TransferToken;