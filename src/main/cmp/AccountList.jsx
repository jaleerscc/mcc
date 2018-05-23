import React, {Component} from "react";
class AccountList extends Component {

/**
 * Shows a list of accounts as cards
 */
    render(){

        return(
            <div className="row">
                        {this.generateSummaryBoxes()}     
                                 
            </div>
        );
    }

    viewTransClick=(accId)=>{
        this.props.viewTransClickEvent(accId);
    }

    generateSummaryBoxes=() => {

        return this.props.data.map((rowObj)=>(            

            <div className="col-lg-3 col-md-6 col-sm-6" key={rowObj.id}>
                <div className="card card-stats">
                                <div className={`card-header ${rowObj.balance<=0?"card-header-warning":"card-header-success"} card-header-icon`}>
                                    <div className="card-icon">
                                        <i className="material-icons">content_copy</i>
                                    </div>
                                    <p className="card-category">{rowObj.display_name} ({rowObj.account_number})</p>
                                    <h3 className="card-title">${rowObj.balance}</h3>
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="material-icons">list</i>
                                        <a className="cursor-hand" onClick={()=>this.viewTransClick(rowObj.id)}>View Transactions</a>
                                    </div>
                                </div>
                </div>
             </div>
            

        ));

    };


}
export default AccountList;