import React, {Component} from "react";
class TransactionList extends Component {

/**
 * Shows a list of transactions in a table
 */
    render(){  
        return(
            <div className="card">
                <div className={`card-header ${this.props.account[0].balance<=0?"card-header-warning":"card-header-success"}`}>
                    <h4 className="card-title">Transaction Details</h4>
                    <p className="card-category">Transactions are listed as latest ones appearing first</p>
                </div>
                <div className="card-body table-responsive">
                    <table className="table table-hover">
                        <thead className="text-warning">
                            <tr><th>Date</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.data.map((tranObj)=>(
                                    tranObj.activity.map(
                                        (actObj)=>(
                                            <tr key={actObj.transaction_uid}>
                                                <td>{actObj.date}</td>
                                                <td>{actObj.description}</td>
                                                <td>{actObj.withdrawal_amount?"Withdrawal":"Deposit"}</td>
                                                <td>{actObj.withdrawal_amount?actObj.withdrawal_amount:actObj.deposit_amount}</td>
                                                <td>{actObj.balance}</td>
                                            </tr>
                                        )
                                    )
                                
                                ))
                            }                            
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default TransactionList;