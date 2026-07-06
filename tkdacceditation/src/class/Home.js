import React,{Component} from 'react';
import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';
import { Enterpoint } from './enterpoint';
import { Prticipantes } from './Prticipantes';
import { Login } from './Login';
import { InfoA } from './Info';
import InfoJason from '../data/user.json';

//https://pagecollective.com/page/ifttt-d24/
export class Home extends Component{
    constructor(props){
        super(props);

        this.state={
            currentPage:'Login',
            isLoading: false,
            Info: InfoJason,

            error: null,
            location:window.location.pathname.split('/')[1],
            windowWidth:window.innerWidth
        }
    }
    /////////////////
    changePage = (pageName) => {
      this.setState({ currentPage: pageName });
    };
    UpdateInfoJason=(event,date,lieu)=>{
      const updatedData = { ...this.state.Info, event:event ,date: date,lieu: lieu };
      this.setState({ Info: updatedData });
      localStorage.setItem('event', event);
      localStorage.setItem('date', date);
      localStorage.setItem('lieu', lieu);
    }
    componentDidMount=()=>{
      let value = localStorage.getItem('event');
      this.state.Info.event = value;
      value = localStorage.getItem('date');
      this.state.Info.date = value;
      value = localStorage.getItem('lieu');
      this.state.Info.lieu = value;
    }
    //////////////////////GETS
    GetDate=()=>{
      const now = new Date();
      const dateString = now.toISOString();
      return dateString;
    }

    render(){
        const {
            currentPage,
            isLoading,
            error,
            Info
        }=this.state;
        if (isLoading) {
          return <Loader />;
        }
        if (error) {
          return <div className='h1 m-5 text-center'>Oooops!</div>;
        }
        return(
        <div className="Main">
        {currentPage === '/' && (
          <Enterpoint changePage={this.changePage} />
        )}
        {currentPage === 'Login' && (
          <Login changePage={this.changePage} user={Info.user}/>
        )}
        {currentPage === 'Prticipantes' && (
          <Prticipantes GetDate={this.GetDate} changePage={this.changePage} Info={Info}/>
        )}
        {currentPage === 'Info' && (
          <InfoA Info={Info} GetDate={this.GetDate} UpdateInfoJason={this.UpdateInfoJason} changePage={this.changePage}/>
        )}
        <Footer/>
      </div>
        )
    }
}