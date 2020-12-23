import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import metamaskAccount from './metamask';
import web3 from "../helper";

class BuyTokenModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalInstance: ''
        }
    }

    componentDidMount() {
        const options = {
            onOpenStart: () => {
                console.log("Open Start");
            },
            onOpenEnd: () => {
                console.log("Open End");
            },
            onCloseStart: () => {
                console.log("Close Start");
            },
            onCloseEnd: () => {
                console.log("Close End");
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(this.Modal, options);

        // let instance = M.Modal.getInstance(this.Modal);
        
        // instance.open();
        // instance.close();
        // instance.destroy();
    }

    buyToken = async (e) => {
        e.preventDefault();
        console.log("inside buyToken!");
        const title = e.target.title.value;
        const type = e.target.type.value;
        const description = e.target.description.value;
        e.target.reset();
        

        await metamaskAccount()
        .then(account => {
            this.props.erc721Instance.methods.buyToken(type, title, description)
            .send({
                 from: account,
                 value:  web3.utils.toWei("0.003"),
                 gas: 800000 
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <a
                    className="waves-effect waves-light btn modal-trigger"
                    data-target="modal1"
                >
                    BuyToken
                </a>

                <div
                    ref={Modal => {
                        this.Modal = Modal;
                    }}
                    id="modal1"
                    className="modal"
                >
                    {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
                    <div className="modal-content">
                        <div className="row">
                            <form className="col s12" onSubmit={this.buyToken}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="type" type="number" min="0" className="validate" />
                                        <label htmlFor="type">Type</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="title" type="text" className="validate" />
                                        <label htmlFor="title">Title</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="description" type="text" className="validate" />
                                        <label htmlFor="description">Description</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <div className="modal-close waves-effect waves-light btn modal-trigger">
                                        <input id="submit" type="submit" class="validate" />
                                        </div>
                                    </div>
                                    {/* <div className="input-field col s6">
                                        <button className="modal-close waves-effect waves-light btn modal-trigger black-text" >Cancel</button>
                                    </div> */}
                                </div>
                            </form>
                        </div>


                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-red btn-flat">
                            Cancel
                        </a>
                        {/* <a className="modal-close waves-effect waves-green btn-flat">
                            Agree
                        </a> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default BuyTokenModal;