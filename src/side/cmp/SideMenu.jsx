import React, {Component} from "react";

class SideMenu extends Component {

    state={
        index:0
    };

    menuItemClick=(pageId)=>{
        this.setState({index:pageId});
        this.props.pageClick(pageId);
    };

    generateNavClass=(id)=>{
        return this.state.index===id?"nav-item active":"nav-item";
    };

    render(){

        return(
            <ul className="nav">
                    <li className={this.generateNavClass(0)}>
                        <a className="nav-link cursor-hand" onClick={()=>this.menuItemClick(0)}>
                            <i className="material-icons">dashboard</i>
                            <p>My Accounts</p>
                        </a>
                    </li>
                    <li className={this.generateNavClass(2)}>
                        <a className="nav-link  cursor-hand" onClick={()=>this.menuItemClick(2)}>
                            <i className="material-icons">library_books</i>
                            <p>Transfer Money</p>
                        </a>
                    </li>          
                    
                </ul>
        );
    }
}
export default SideMenu;