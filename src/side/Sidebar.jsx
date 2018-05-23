import React, {Component} from "react";
import SideLogo from './cmp/SideLogo';
import SideMenu from './cmp/SideMenu';
class Sidebar extends Component {

    menuClickEvent=(pageId)=>{
        this.props.menuClick(pageId);
    };

    render(){

        return(
            <div className="sidebar" data-color="green" data-background-color="white">
            <SideLogo/>
            <div className="sidebar-wrapper">
                        <SideMenu pageClick={this.menuClickEvent}/>                
            </div>
        </div>
        );
    }
}
export default Sidebar;