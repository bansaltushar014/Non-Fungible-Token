import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import metamaskAccount from './subcomponents/metamask';
import web3 from "../helper";

class BuyTokenModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalId: 'viewTokenModal',
            tokenDetail : {
                tokenType: '',
                tokenTitle: '',
                tokenDescription: ''
            }
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

    viewToken = async (e) => {
        e.preventDefault();
        this.instance.open();
        console.log("Inside ViewToken!");

        
        const _index = e.target.index.value;
        
        e.target.reset();
        
        this.props.erc721Instance.methods.viewToken(_index)
            .call()
            .then(res => {
                console.log(res);
                const tokenDetail = {
                    tokenType : res.tokenType_,
                    tokenTitle: res.tokenTitle_,
                    tokenDescription: res.tokenDescription_
                }

                console.table(tokenDetail);
                this.setState({tokenDetail: tokenDetail})

            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
                  <div className="card"> 
                <div className="card-content"> 
                <b> View Token Details</b> <br/>
                <form className="col s12" onSubmit={this.viewToken} >
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="index" type="number" min="0" max={this.props.totalSupply} required className="validate" />
                            <label htmlFor="index">Index</label>
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
                            View Token 
                            <br/><br/>
                            Token Type : {this.state.tokenDetail.tokenType} 
                            <br/><br/>
                            Token Title : {this.state.tokenDetail.tokenTitle}
                            <br/><br/>
                            Token Description : {this.state.tokenDetail.tokenDescription}
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
            </div>
        );
    }
}

export default BuyTokenModal;