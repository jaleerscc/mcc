import React, {Component} from "react";
class ContentHeading extends Component {

/**
 * Generate header text based on component
 */
    generateHeading=()=>{
        let contentHeading="Account Dashboard";
        switch (this.props.data.pageId) {
            case 2:
                contentHeading="Money Transfer";
                break;
        
            default:
                contentHeading="Account Dashboard";
                break;
        }
        return contentHeading;
    };

    render(){

        return(
            <nav className="navbar navbar-expand-lg navbar-transparent  navbar-absolute fixed-top">
                <div className="container-fluid">
                    <div className="navbar-wrapper">
                        <a className="navbar-brand" href="#pablo">{this.generateHeading()}</a>
                    </div>                    
                </div>
            </nav>
        );
    }
}
export default ContentHeading;