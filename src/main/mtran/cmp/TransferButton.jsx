import React, {Component} from "react";

class TransferButton extends Component {

    transferClick=(srcId,destId)=>{
        this.props.transferEvent(srcId,destId);
    };

    render(){

        if(this.props.srcAccount!==null && this.props.destAccount!=null){
            if(this.props.srcAccount!==this.props.destAccount) {
                return <a onClick={()=>this.transferClick(this.props.srcAccount.id,this.props.destAccount.id)}className="btn btn-success">Transfer Now<div className="ripple-container"></div></a>;
            }
            else {
                return <a className="btn btn-secondary disabled">Transfer Now<div className="ripple-container"></div></a>
            }
        }
        else {
            return <a className="btn btn-secondary disabled">Transfer Now<div className="ripple-container"></div></a>
        }

        
    }
}
export default TransferButton;