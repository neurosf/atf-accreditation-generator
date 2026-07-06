import React,{Component} from 'react';
import './Login.css';

export class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            userlog:{
                UserName:"",
                PassWord:"",
            },
            Proposedusernames:[],
            log:0,
            passwordW:"Your Password",
            usermailW:"Your Email / Username",
            usenamemsg:'',
            Emailmsg:'',
            PassWordmsg:'',
            isLoadingregister: false,
            
        };
    }
////////////////log change
    changePasswordlog = (e)=>{
        if(e.target.value!='')this.state.passwordW='';
        else this.state.passwordW="Your Password";
        let X=this.state.userlog;
        X.PassWord=e.target.value;
        this.setState({userlog:X});
    }
    changeusername_maillog = (e)=>{
        if(e.target.value!='')this.state.usermailW='';
        else this.state.usermailW="Your Email / Username";
        let X=this.state.userlog;
        X.UserName=e.target.value;
        X.Email=e.target.value;
        this.setState({userlog:X});
    }
//////////////////////////////LOgin
    verfie=(e)=>{
        e.preventDefault(); 
        this.setState({PassWordmsg:""})
        this.setState({usenamemsg:""})

        if(this.state.userlog.UserName === this.props.user.UserName){
            if(this.state.userlog.PassWord === this.props.user.PassWord){
                this.props.changePage('/');
            }else{
                this.setState({PassWordmsg:"wrong password"})
            }
        }else{
            this.setState({usenamemsg:"user not found"})
        }
    }
    ////////////////////////////  
    Passwodvision=(e)=>{
        let password= document.getElementById(e.target.getAttribute('eye1'));
        if(password.type==='text'){password.type = 'password';
            e.target.classList.remove("bi-eye-fill");
            e.target.classList.add("bi-eye-slash-fill");
        }
        else{ password.type = 'text';
            e.target.classList.add("bi-eye-fill");
            e.target.classList.remove("bi-eye-slash-fill");
        }
    }
    componentDidMount=()=>{

    }
    render(){
        const {
            userlog,
            passwordW,
            usermailW,
            PassWordmsg,
            usenamemsg
        }=this.state;
        return(
            <div className="fontSignup">
            <div className="container scrollLogin">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <form onSubmit={(e)=>this.verfie(e)} method='POST' className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <img width='100px' src='./static/PIC/logoLaissance.png' />
                                                <h4 className="mb-4">Log In</h4>
                                                <div class="inputanim">
                                                    <i class="bi bi-person-fill logI"></i>
                                                    <input type="text" name="logemail1"className="form-style loginput" value={userlog.UserName} onChange={this.changeusername_maillog}  id="logemail1" required/>
                                                    <label>
                                                        {[...usermailW].map((e, i) => (<span style={{transitionDelay:i*40+'ms'}}>{e}</span>))}
                                                    </label>
                                                </div>
                                                <div id='msg_usernamelog'className='text-danger'>{usenamemsg}</div>                                                
                                                <div className="inputanim">
                                                <i className="bi bi-eye-slash-fill logI"eye1="logpass1" onClick={this.Passwodvision}></i>
                                                    <input type="password" name="logpass1" className="form-style loginput"  value={userlog.PassWord} onChange={this.changePasswordlog} id="logpass1" required/>
                                                    <label>
                                                        {[...passwordW].map((e, i) => (<span style={{transitionDelay:i*50+'ms'}}>{e}</span>))}
                                                    </label>
                                                </div>
                                                <div id='msg_passwordlog'className='text-danger m-2'>{PassWordmsg}</div>
                                                <input type="submit" className="btn buttn mt-4" value={"Login"}/>
                                              </div>
                                          </div>
                                      </form>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
            </div>
        </div>
        )
    }
}