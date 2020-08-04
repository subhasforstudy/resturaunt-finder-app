import React,{Component} from 'react'
import './header.css'


class Header extends Component {
    render(){
        return<div className="Container-fluid">
            <div className="row Row1">
                <div className="col-sm-3 col-md-3 col-lg-3">
                    <div className="logoBox">
                        <div className="logoText">
                             e!
                        </div>

                    </div>

                </div>

                
                <div className="col-sm-3 col-md-3 col-lg-3">

                </div>
                <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="log-create">
                           <div className="login">
                             login

                            </div>
                            <div className="CreateBox">
                                <div className="CreateTxt">
                                  Create New Account
                                </div>
                            </div>
                    </div>

                </div>

            </div>
            

        </div>
    }
}

export default Header;