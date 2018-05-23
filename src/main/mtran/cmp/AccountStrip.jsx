import React, {Component} from "react";

class AccountStrip extends Component {

/**
 * Shows a summary of account details with name, account number and current balance
 */
    render(){

        return (<div className="card card-stats">
                                <div className="card-header card-header-info card-header-icon">
                                    {this.props.account?<p className="card-category">{this.props.account.display_name} ({this.props.account.account_number})</p>:""}
                                    {this.props.account?<h3 className="card-title">{this.props.account.balance}</h3>:""}
                                </div>
        </div>);
        
    }
}
export default AccountStrip;