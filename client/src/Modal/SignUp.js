import React, { Component } from 'react';
import IfClause from './../component/IfClause';


export default class  SignUp extends Component{

    state = {
        signedUp: false,
        emailInvalid: false,
        emailRequired: false,
        pwdRequired : false,
        pwdInvalid : false,
    };

    checkEmailAddress(email) {
        let index = email.indexOf('@');
        if(index === -1) {
            return false;
        }

        return true;
    }

    onSignUp = () => 
    {

        let url = 'http://localhost:3000/signup';

        // let's hide all error message from previous time
        this.setState( {
            emailRequired : false,
            emailInvalid : false,
            pwdRequired : false,
            pwdInvalid : false,
        })

        let htmlEmailElement = document.getElementById('signupEmail');
        let email = htmlEmailElement.value.trim();

        // check for errors again
        if(email.length === 0) {
            this.setState({ emailRequired : true });
            return;
        }

        if(!this.checkEmailAddress(email)) {
            this.setState({ emailInvalid : true });
            return;
        }

        let htmlPasswordElement = document.getElementById('signupPassword');
        let password = htmlPasswordElement.value.trim();

        if(password.length === 0) {
            this.setState({ pwdRequired : true });
            return;
        }

        if(password.length < 5 ) {
            this.setState({ pwdInvalid : true });
            return;
        }  

        
        let htmlCpasswordElement = document.getElementById('confirmPassword');
        let cpwd = htmlCpasswordElement.value.trim();

        if(password.length !== cpwd.length && password === cpwd) {
            this.setState({ pwdRequired : true });
            return;
        }

        console.log('email is :' , email);
        console.log('pwd is :' , password);

        fetch(url,{
            method: 'post',
            mode: "cors",
            // body: JSON.stringify(data)
        }).then((response) => {
                return response.json();
            }).then((data) => {            
                this.setState( { signedUp: true  } );
                console.log('json data:', data);
            }).catch((err) => {              
                console.log('Error retured API:', err);
            });
        }    
    
    render (){
        return(
                <div className="modal" id='signinModal' tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Sign Up</h5>
                            <button type="button" className="close" onClick={()=>{this.props.onClose()}} aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form role="form">
                                <div className="form-group">
                                    <input type="email" className="form-control" id="signupEmail" placeholder="Email"/>
                                    <IfClause condition={ this.state.emailRequired }>
                                        <p className="form-text text-muted error-message">Email required</p>
                                    </IfClause>    
                                    <IfClause condition={ this.state.emailInvalid }>
                                        <p className="form-text text-muted error-message">Invalid Email</p>
                                    </IfClause>    
                                    <input type="password" className="form-control" id="signupPassword" placeholder="Password" />
                                    <IfClause condition={ this.state.pwdRequired }>
                                        <p className="form-text text-muted error-message">Password required</p>
                                    </IfClause>    
                                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
                                    <IfClause condition={ this.state.pwdRequired }>
                                        <p className="form-text text-muted error-message">Re-enter your password to confirm</p>
                                    </IfClause>    
                                    <IfClause condition={ this.state.pwdInvalid }>
                                        <p className="form-text text-muted error-message">Passwords do not match</p>
                                    </IfClause>    
                                    <button className="btn btn-primary btn-block" onClick={this.onSignUp}>Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
