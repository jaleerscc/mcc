import React, {Component} from "react";

class Footer extends Component {

    render(){

        return(
            <footer className="footer ">
                <div className="container-fluid">
                    <nav className="pull-left">
                        <ul>
                            <li>
                                <a>
                                    Help
                                </a>
                            </li>
                            <li>
                                <a>
                                    About Us
                                </a>
                            </li>                   
                        </ul>
                    </nav>
                    <div className="copyright pull-right">
                        Copyright text here
                    </div>
                </div>
            </footer>
        );
    }
}
export default Footer;