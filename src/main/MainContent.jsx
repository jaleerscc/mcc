import React, {Component} from "react";
import AccountList from "./cmp/AccountList";
import TransactionList from "./cmp/TransactionList";
import MoneyTransfer from "./mtran/MoneyTransfer";

class MainContent extends Component {

    
    transactionDetailClick=(accId)=>{
        this.props.transactionsDisplayHandler(accId);
    }

    initiateTransfer=(amount,srcId,destId)=>{
        this.props.transferMoneyOp(amount,srcId,destId);
    };

    chooseMainContent=()=>{

        let mainContent=<div className="card"><div className="card-header card-header"><p className="card-category">Invalid page.</p></div></div>;

        switch(this.props.data.pageId){
            case 0: // account dashboard - list of accounts
                mainContent=
                        <div className="container-fluid">
                            <AccountList data={this.props.data.accountsToShow}  viewTransClickEvent={this.transactionDetailClick}/>
                            {this.props.data.accountsToShow && this.props.data.accountsToShow.length>0?<TranDefaultMsg/>:""}
                        </div>;
            break;
            case 1: // account details page - account summary as well as transactions
                mainContent=
                    <div className="container-fluid">
                        <AccountList data={this.props.data.accountsToShow}  viewTransClickEvent={this.transactionDetailClick}/>
                        <div className="row">
                            <div className="col-lg-7 col-md-12">
                                <TransactionList account={this.props.data.accountsToShow} data={this.props.data.transactionsToShow}/>
                            </div>
                            <div className="col-lg-5 col-md-12">
                            </div>
                        </div>
                    </div>;
            break;
            case 2: // money transfer between accounts
                mainContent=
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <MoneyTransfer data={this.props.data.accountsToShow} transferHandler={this.initiateTransfer}/>
                        </div>
                        <div className="col-lg-6 col-md-12">
                        </div>
                    </div>
                </div>;
            break;
            default:
                mainContent=<div className="card"><div className="card-header card-header"><p className="card-category">Invalid page.</p></div></div>;
            break;
        }
        return mainContent;

    };

    render(){      
        return(
            <div className="content">
                <div className="container-fluid">
                {this.chooseMainContent()}                
                </div>
            </div>
        );
    }


}
const TranDefaultMsg=()=>{
    return(        
        <div className="card">
                <div className="card-header card-header">
                    <p className="card-category">Select an account to view transaction details.</p>
                </div>                
        </div>
    );
};
export default MainContent;