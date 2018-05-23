import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Sidebar from './side/Sidebar';
import AccountList from './main/cmp/AccountList';
import TransactionList from './main/cmp/TransactionList';
import AccountStrip from './main/mtran/cmp/AccountStrip';
import TransferButton from './main/mtran/cmp/TransferButton';
import MoneyTransfer from './main/mtran/MoneyTransfer';
import MainContent from './main/MainContent';
import ContentHeading from './main/ContentHeading';

it('Application renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

/**
 * Test for Sidebar component
 */
it('Navigation menu renders successfully', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sidebar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
/**
 * Test for AccountList
 */
it('AccountList is always displayed', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AccountList data={[]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
/**
 * Test for AccountStrip
 */
it('Navigation menu renders successfully', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AccountStrip />, div);
  ReactDOM.unmountComponentAtNode(div);
});
/**
 * Test for TransferButton
 */
it('TransferButton renders successfully', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TransferButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
/**
 * Test for Sidebar component
 */
it('MoneyTransfer page is displayed', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MoneyTransfer data={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
/**
 * Test for ContentHeading component
 */
it('ContentHeading renders successfully', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContentHeading data={2}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});




