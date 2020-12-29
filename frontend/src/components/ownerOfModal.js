import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import ExistTokenId from './subcomponents/existTokenId';
import metamaskAccount from './subcomponents/metamask';
import web3 from "../helper";

class BuyTokenModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalId: 'ownerTokenModal',
            ownerAddress: ''
        }
    }

    componentDidMount() {
        const options = {
            onOpenStart: () => {
                // console.log("Open Start");
            },
            onOpenEnd: () => {
                // console.log("Open End");
            },
            onCloseStart: () => {
                // console.log("Close Start");
            },
            onCloseEnd: () => {
                // console.log("Close End");
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };
        this.instance = M.Modal.init(this.Modal, options);
        
        // let instance = M.Modal.getInstance(this.Modal);
        
        // instance.open();
        // instance.close();
        // instance.destroy();
    }

    ownerOfToken = async (e) => {
        e.preventDefault();
        this.instance.open();
        console.log("Inside ViewToken!");

        
        const _index = e.target.OwnerAddressbyIndex.value;
        console.log(_index);
        
        e.target.reset();
        
        if(await ExistTokenId(this.props.erc721Instance, _index)){
        this.props.erc721Instance.methods.ownerOf(_index)
            .call()
            .then(res => {
                console.log(res);
                this.setState({ownerAddress : res});
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            alert(" Index value does not exist! ");
        }             
    }

    render() {
        return (
            <div className="card"> 
                <div className="card-content"> 
                <b> OwnerOf Token</b> <br/>
                <form className="col s12" onSubmit={this.ownerOfToken} >
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="OwnerAddressbyIndex" type="number" required min="0" max={this.props.totalSupply} className="validate" />
                            <label htmlFor="OwnerAddressbyIndex">TokenId</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <div className="modal-close waves-effect waves-light btn">
                            <input id="submit" type="submit" className="validate"/>
                            </div>
                        </div>
                    </div>
                </form>
                {/* <a
                    className="waves-effect waves-light btn modal-trigger"
                    data-target={this.state.modalId}
                >
                    BuyToken
                </a> */}

                <div
                    ref={Modal => {
                        this.Modal = Modal;
                    }}
                    id={this.state.modalId}
                    className="modal"
                >
                    {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
                    <div className="modal-content">
                        <div className="row">
                           Owner Of        
                           <br/><br/>
                           Address : {this.state.ownerAddress}
                        </div>


                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-red btn-flat">
                            Okay
                        </a>
                        {/* <a className="modal-close waves-effect waves-green btn-flat">
                            Agree
                        </a> */}
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default BuyTokenModal;