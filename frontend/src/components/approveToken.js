import React, { Component } from 'react';
import metamaskAccount from './subcomponents/metamask';

const ApproveToken = (props) => {

    const ApproveTokenFun = async (e) => {
        e.preventDefault();

        const _to = e.target.receiverApprove.value;
        const _tokenId = e.target.tokenIdApprove.value;

        await metamaskAccount()
        .then(account => {
            props.erc721Instance.methods.approve( _to, _tokenId)
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
            <b> Approve token </b> <br/><br/>
            <form className="col s12" onSubmit={ApproveTokenFun} >
                <div className="row">
                    <div className="input-field col s12">
                        <input id="receiverApprove" type="text" required className="validate" />
                        <label htmlFor="receiverApprove">To Address</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="tokenIdApprove" type="text" required className="validate" />
                        <label htmlFor="tokenIdApprove">Token Id</label>
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

export default ApproveToken;