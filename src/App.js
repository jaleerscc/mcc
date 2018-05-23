import React, { Component } from 'react';
import { NotificationContainer,NotificationManager } from "react-notifications";
import Sidebar from './side/Sidebar';
import ContentHeading from './main/ContentHeading';
import Footer from './misc/Footer';
import $ from 'jquery';
import Spinner from './misc/Spinner';
import MainContent from './main/MainContent';

class App extends Component {

  state={
    dataLoaded:true,
    accountData:[],
    transactionData:[],
    currentContent:{
      pageId:0,
      pageParam:null,
      accountsToShow:[],
      transactionsToShow:[]
    }
  };

  /**
   * Handles menu click and loads various component based on menu selection from the left sidebar.
   */
  menuNavigation=(pageId)=>{
    switch (pageId) {
      case 2:
        this.loadMoneyTransferPage(pageId);          
      break;      
      default:
        this.loadDashboard();
      break;
    }
  };

  /**
   * Loads the component to show money transfer between two accounts
   */
  loadMoneyTransferPage=(pId)=>{

    this.setState(
      {
        dataLoaded:true,
        accountData:this.state.accountData,
        transactionData:this.state.transactionData,
        currentContent:{
          pageId:pId,
          pageParam:null,
          accountsToShow:this.state.accountData,
          transactionsToShow:[]
        }
      }        
    );

  };

  /**
   * Loads the main page of the application where the user can see the accounts
   */
 loadDashboard=()=>{

  // Optional - to sync data from server - not yet implemented
  // this.loadAccountData();
  this.setState(
    {
      dataLoaded:true,
      accountData:this.state.accountData,
      transactionData:this.state.transactionData,
      currentContent:{
        pageId:0,
        pageParam:null,
        accountsToShow:this.state.accountData,
        transactionsToShow:[]
      }
    }        
  );

 } ;

 /**
  * Fetches the transaction data for a particular account from the state and passes to content page to display
  */
 loadTransDataForAcc=(accId)=>{

  let accountToShow=this.state.accountData.filter(accObj=>accObj.id===accId);
  let accountTransactionsToShow=this.state.transactionData.filter(tranObj=>tranObj[accId]);  
  if(accountTransactionsToShow[0] && accountTransactionsToShow[0][accId]){
    accountTransactionsToShow=accountTransactionsToShow[0][accId];
  }
  else {
    accountTransactionsToShow=[];
  }
  this.setState(
    {
      currentContent:{
        pageId:1,
        pageParam:null,
        accountsToShow:accountToShow,
        transactionsToShow:accountTransactionsToShow
      }
    }        
  );  
};

/**
 * Chained promises to fetch JSON data from the server - first for accounts & second one for transactions
 */
loadAccountData=()=>{

  this.getDataFromServer('listOfAccounts')
    .then((data)=>{
      // set account list data on state
      this.setState(
        {
          dataLoaded:false,
          accountData:data,
          transactionData:[],
          currentContent:{
            pageId:0,
            pageParam:null
          }
        }        
      );
      // call next one for transactions data
      return this.getDataFromServer('accountTransactions');
    })
    .then((data)=>{
      console.log('Transaction data from Server: ',data);
      this.setState(
        {
          dataLoaded:true,
          accountData:this.state.accountData,
          transactionData:data,
          currentContent:{
            pageId:0,
            pageParam:null,
            accountsToShow:this.state.accountData,
            transactionsToShow:[]
          }
        }        
      );
    })
    .catch((err)=>{
      console.log('Unable to fetch data from server: ',err);
    });

};

/**
 * Load the account dashboard when the application is loaded
 */
  componentDidMount(){
    this.loadAccountData();
  }

  /**
   * Ajax call as a promise - to fetch and pase JSON from server
   */
  getDataFromServer=(url)=>{
      return new Promise((resolve,reject)=>{
        $.ajax(
                {
                  type:"GET",
                  url:`data/${url}.json`,
                  dataType:"json",
                  success:function(data){
                    setTimeout(() => {
                      resolve(data);
                    }, 1000);                      
                  },
                  error:function(xhr,status,err){
                      reject(err);
                  }        
                }
              );
      });
  };

  /**
   * performs a money transfer between two accounts and updates the transaction log of two accounts involved
   * Shows a notification upon success
   */
  interAccTransfer=(amount,srcId,destId)=>{

    console.log(srcId,destId);
    let accData=this.state.accountData;
    let accIndex=accData.findIndex(acc=>acc.id===srcId);
    console.log((parseFloat(accData[accIndex].balance)-parseFloat(amount)).toFixed(2));
    accData[accIndex].balance=(parseFloat(accData[accIndex].balance)-parseFloat(amount)).toFixed(2);
    this.updateTransactionRecord("Withdrawal/Transfer",srcId,amount,accData[accIndex].balance)
    accIndex=accData.findIndex(acc=>acc.id===destId);
    accData[accIndex].balance=(parseFloat(accData[accIndex].balance)+parseFloat(amount)).toFixed(2);
    this.updateTransactionRecord("Deposit/Transfer",destId,amount,accData[accIndex].balance)
    // insert transaction for deposit
    this.setState(
      {
        dataLoaded:true,
        accountData:accData,
        transactionData:this.state.transactionData,
        currentContent:{
          pageId:0,
          pageParam:null,
          accountsToShow:accData,
          transactionsToShow:[]
        }
      }        
    );
    this.showNotification("Money transfer successfully completed","Money Transfer");
  };

  /**
   * Performs a transaction record update for a particular account stored in state - no server update implemented
   */
  updateTransactionRecord=(type,accId,amount,balance)=> {

    let currentDate=new Date().toISOString().split('T')[0];
    let tranData=this.state.transactionData;
    let accTranIndex=tranData.findIndex(accTranObj=>accTranObj[accId]);
    let activityIndex=tranData[accTranIndex][accId].findIndex(tranObj=>tranObj.date===currentDate);

    let tranObj={
      id: accId,
      date: currentDate,
      description: type,
      balance: balance,
      transaction_uid: new Date().getTime()+accId
    }
    if(type==="Withdrawal/Transfer"){
      tranObj["withdrawal_amount"]=amount;
    }
    else {
      tranObj["deposit_amount"]= amount;
    }
    if(activityIndex!==-1){
      tranData[accTranIndex][accId][activityIndex].activity.unshift(tranObj);
    }
    else {
      tranData[accTranIndex][accId].unshift({
        date:currentDate,
        activity:[tranObj]
      });      
    }
    this.setState(
      {
        transactionData:tranData,
      }        
    );
  }

/**
 * Render all main components
 */
  render() {
    return (
      <div className="wrapper">
        <Sidebar menuClick={this.menuNavigation}/>
        {this.state.dataLoaded?this.loadApplicationContent():this.showSpinner()}
    </div>
    );
  }

  /**
   * Loads the main content page on the right side
   */
  loadApplicationContent=()=>{
    return(
          <div className="main-panel">
            <ContentHeading data={this.state.currentContent}/>            
            <MainContent data={this.state.currentContent} transactionsDisplayHandler={this.loadTransDataForAcc} transferMoneyOp={this.interAccTransfer}/>
            <Footer/>
            <NotificationContainer/>
          </div>);
  };
  
  /**
   * Shows a spinner animation to indicate the progress
   */
  showSpinner=()=>{
    return(
      <div className="main-panel">   
          <Spinner/>
      </div>
    );
  };

/**
 * Shows a notification on top right corner of the page
 */
  showNotification=(msg,title)=>{
    NotificationManager.success(msg, title);
  };

}

export default App;