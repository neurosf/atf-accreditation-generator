import React,{Component} from 'react';
import { FormEvent } from './FormEvent';

export class InfoA  extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const {
            event,
            date,
            lieu,
            places
        } = this.props.Info
        return(
        <div>
            <div>
                <div className='enterpoint'>
                    <div className='d-flex'>
                        <button onClick={()=>this.props.changePage('/')}  className="backbtn"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></button>
                        <h1 className='text-center' style={{width:"90%"}}>Information d'Accréditation</h1>
                    </div>
                    <div>
                    <div className="plan">
                        <div className="inner">
                            <span className="pricing">
                                <span>
                                    <small></small>
                                </span>
                            </span>
                            <p className="title">l'événement</p>
                            <div className='event'>
                                <p className="info">Titre: {event} </p>
                            </div>
                            <div className='event'>
                                <p className="info">Date: {date} </p>
                            </div>
                            <div className='event'>
                                <p className="info">Lieu: {lieu} </p>
                            </div>
                            <div className='event'>
                                <button className="button" data-bs-toggle="modal"data-bs-target="#EventForm">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </button>
                            </div>
                            <p className="title">les Accès</p>
                            <ul className="features">
                                {places.map(P=>(<>
                                <li>
                                    <span className="icon">
                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0h24v24H0z" fill="none"></path>
                                            <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                        </svg>
                                    </span>
                                    <span><strong>{P.rang}</strong> {P.name}</span>
                                </li>
                                </>))}

                            </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <FormEvent Info={this.props.Info}  UpdateInfoJason={this.props.UpdateInfoJason}/>
        </div>
        )
    }
}