import React, {Component} from "react";
import TransferButton from "./cmp/TransferButton";
import AccountStrip from "./cmp/AccountStrip";
class MoneyTransfer extends Component {

    state={
        srcAcc:null,
        destAcc:null,
        amount:0
    };

    renderSourceDropdownItems=()=>{
        return this.props.data.map((accObj)=>(
            <a className="dropdown-item" onClick={()=>this.setState({srcAcc:accObj})} key={accObj.id}>{accObj.display_name}</a>
        ));
    };

    renderDestinationDropdownItems=()=>{
        return this.props.data.map((accObj)=>(
            <a className="dropdown-item" onClick={()=>this.setState({destAcc:accObj})} key={accObj.id}>{accObj.display_name}</a>
        ));
    };

    transferBwAccounts=(srcId,dstId)=>{
        this.props.transferHandler(this.state.amount,srcId,dstId);
    };
/**
 * Renders the form to do money transfer between two accounts
 */
    render(){

        return(
            <div className="card">
                <div className="card-header card-header-success">
                    <h4 className="card-title">Transfer money between accounts</h4>                   
                </div>
                <div className="row">
                    <div className="col-lg-1 col-md-12"></div>
                    <div className="col-lg-3 col-md-12">
                        <div className="btn-group">
                            <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Source account</button>
                            <div className="dropdown-menu">
                                {this.renderSourceDropdownItems()}
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" onClick={()=>this.setState({srcAcc:null})}>Clear Selection</a>
                            </div>
                        </div>        
                    </div>
                    <div className="col-lg-1 col-md-12"></div>
                    <div className="col-lg-6 col-md-12">
                            <AccountStrip account={this.state.srcAcc}/>
                    </div> 
                    <div className="col-lg-1 col-md-12"></div>   
                </div>
                <div className="row">
                    <div className="col-lg-1 col-md-12"></div>
                    <div className="col-lg-3 col-md-12">
                        <div className="btn-group">
                            <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Destination account</button>
                            <div className="dropdown-menu">
                                {this.renderDestinationDropdownItems()}                                
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" onClick={()=>this.setState({destAcc:null})}>Clear Selection</a>
                            </div>
                        </div>        
                    </div>
                    <div className="col-lg-1 col-md-12"><i className="material-icons">arrow_right</i></div>
                    <div className="col-lg-6 col-md-12">
                        <AccountStrip account={this.state.destAcc}/>
                    </div>
                    <div className="col-lg-1 col-md-12"></div>    
                </div>
                <div className="row">
                    <div className="col-lg-1 col-md-12"></div>
                    <div className="col-lg-3 col-md-12">
                       <h4> Amount:        </h4>
                    </div>
                    <div className="col-lg-1 col-md-12"></div>
                    <div className="col-lg-3 col-md-12">
                        <input type="text" onChange={(event)=>this.setState({amount:event.target.value})} className="form-control" id="validationDefault05" placeholder="$" required/>        
                    </div>
                    <div className="col-lg-4 col-md-12"></div>    
                </div>
                <div className="row">                    
                    <div className="col-lg-5 col-md-12"></div>
                    <div className="col-lg-6 col-md-12">
                        <TransferButton srcAccount={this.state.srcAcc} destAccount={this.state.destAcc} transferEvent={this.transferBwAccounts}/>        
                    </div>
                    <div className="col-lg-1 col-md-12"></div>    
                </div>
            </div>
        );
    }
}
export default MoneyTransfer;