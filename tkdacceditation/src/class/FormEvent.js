import React,{Component} from 'react';

export class FormEvent  extends Component{

    constructor(props){
        super(props);
        this.state={
            event:this.props.Info.event,
            date:this.props.Info.date,
            lieu:this.props.Info.lieu
        }
    }
//////////////////////set state var
    changeevent =(e)=>{
        this.setState({event:e.target.value});
    }
    changeeventdate =(e)=>{
        this.setState({date:e.target.value});
    }
    changeeventlieu =(e)=>{
        this.setState({lieu:e.target.value});
    }
    Submit=(e)=>{ 
        e.preventDefault(); 
        const {event,date,lieu}=this.state;
        this.props.UpdateInfoJason(event,date,lieu)
        this.CloseModel('EventForm')
    }
    ////
    CloseModel(Modelid){
        const modal = document.getElementById(Modelid);
        modal.style.display = 'none';
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            modalBackdrop.remove();
        }
        document.body.classList.remove('modal-open');
        document.body.removeAttribute('style');
    }
    render(){
        const {
            event,
            date,
            lieu
        }=this.state;
        return(
        <div>
        <form className="modal fade" id="EventForm" tabIndex="-1" aria-hidden="true" onSubmit={(e)=>this.Submit(e)}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content" style={{maxWidth:'500px',margin: "auto"}}>
            <div className="modal-header">
                <h5 className="modal-title">Modifie l'événement</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                    <div className="p-2 w-100 bd-highlight">
                        <div className=" inputgroup mb-3">
                            <input type="text" value={event}onChange={this.changeevent} required/>
                            <span>événement Titre</span>
                        </div>
                        <div className=" inputgroup mb-3">
                            <input type="text" value={date}onChange={this.changeeventdate} required/>
                            <span>événement date</span>
                        </div>
                        <div className=" inputgroup mb-3">
                            <input type="text" value={lieu}onChange={this.changeeventlieu} required/>
                            <span>événement lieu</span>
                        </div>
                    </div>
                </div>
               <button type="submit" className="btn3 float-start" >Update</button>
            </div>

            </div>
            </div> 
        </form>
    </div>
        )
    }
}