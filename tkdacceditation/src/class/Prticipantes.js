import React,{Component} from 'react';
import { FormPrticipantes } from './FormPrticipantes';
import CartParticipante from './CartParticipante';
import AllCartParticipante from './AllCartPaticipante';
import { variables } from '../Variables';

export class Prticipantes  extends Component{

    constructor(props){
        super(props);

        this.state={
            Prticipantes:[],
            selectPrticipantes:[],
            chechedall:false,
            modalTitle:"",

            selectedPrticipantes:{
                id:0,
                Nom:"",
                Prenom:"",
                Photo:"",
                IDp:"",
                Type:0,
                autoType:"",
            },
            useautoType:true,
            PrticipantesIDFilter:"",
            PrticipantesNomFilter:"",
            PrticipantesPrenomFilter:"",
            PrticipantesTypeFilter:"",
            PrticipantesWithoutFilter:[],
        }
        this.FilterFn = this.FilterFn.bind(this);
    }
////////////////////////////filter
    FilterFn() {
        const {
        PrticipantesNomFilter,
        PrticipantesPrenomFilter,
        PrticipantesIDFilter,
        PrticipantesTypeFilter,
        } = this.state;
    
        const filteredData = this.state.PrticipantesWithoutFilter.filter((el) => {
        return (
            el.Nom.toString().toLowerCase().includes(PrticipantesNomFilter.toString().trim().toLowerCase()) &&
            el.Prenom.toString().toLowerCase().includes(PrticipantesPrenomFilter.toString().trim().toLowerCase()) &&
            el.IDp.toString().toLowerCase().includes(PrticipantesIDFilter.toString().trim().toLowerCase()) &&
            ((this.getTypeName && this.getTypeName(el.Type).toString().toLowerCase().includes(PrticipantesTypeFilter.toString().trim().toLowerCase())) ||
            (this.getTypeDesc && this.getTypeDesc(el.Type).toString().toLowerCase().includes(PrticipantesTypeFilter.toString().trim().toLowerCase())))
        );
        });
    
        this.setState({ Prticipantes: filteredData });
    }
    sortResult(prop,asc){
        var sortedData=this.state.PrticipantesWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({Prticipantes:sortedData});
    }
    changePrticipantesNomFilter = (e)=>{
        this.state.PrticipantesNomFilter=e.target.value;
        this.FilterFn();
    }
    changePrticipantesPrenomFilter = (e)=>{
        this.state.PrticipantesPrenomFilter=e.target.value;
        this.FilterFn();
    }
    changePrticipantesIDFilter = (e)=>{
        this.state.PrticipantesIDFilter=e.target.value;
        this.FilterFn();
    }
    changePrticipantesTypeFilter=(e)=>{
        this.state.PrticipantesTypeFilter=e.target.value;
        this.FilterFn();
    }
    selectpart = (e, id) => {
        if (e.target.checked) {
            this.setState((prevState) => ({
            selectPrticipantes: [
                ...prevState.selectPrticipantes,
                prevState.PrticipantesWithoutFilter.find((participant) => participant.id === id)
            ]
            }));
        } else {
            this.setState((prevState) => ({
            selectPrticipantes: prevState.selectPrticipantes.filter((participant) => participant.id !== id)
            }));
        }
    }
    checkAllCheckboxes = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = this.state.chechedall; // Toggle the checked state
        });
        if(this.state.chechedall){
            this.setState({selectPrticipantes:this.state.PrticipantesWithoutFilter})
        }else {
            this.setState({selectPrticipantes:[]})
        }
        this.setState({chechedall:!this.state.chechedall})
    }
//////////////////////////get data from API
    refreshList(){
        fetch(variables.API_URL+'Participant/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Prticipantes:data,PrticipantesWithoutFilter:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    getTypeName=(rang)=>{
        switch (rang){
            case 1: return "P";
            case 2: return "C";
            case 3: return "R";
            case 4: return "OC";
            case 5: return "VIP";
        }
    }
    getTypeDesc=(rang)=>{
        switch (rang){
            case 1: return "Player";
            case 2: return "Coach";
            case 3: return "Referee";
            case 4: return "Organising Committee";
            case 5: return "Fédération";
        }
    }
    getMaxidPr=()=>{
        const { Prticipantes } = this.state;
        const date = this.props.GetDate().slice(2, 10).replace(/-/g, '');

        if (Prticipantes.length === 0) return 1;
        
        const existingIds = Prticipantes.map((user) => {
          if(date===user.IDp.slice(4, 10)) return parseInt(user.IDp.slice(10, 14));
        });        
        let minUnusedId = 1;
        while (existingIds.includes(minUnusedId)) {
          minUnusedId++;
        }
        
        return minUnusedId;
    }
///////////////////////pompe data actions
    addClick(){
        this.setState({
            modalTitle:"Ajouter Prticipantes",
            useautoType:false,
            selectedPrticipantes:{
                id:0,
                Nom:"",
                Photo:"",
                Prenom:"",
                Type:1,
                autoType:"",
                IDp:""
            }
        });
    }
    editClick(part){
        this.setState({
            modalTitle:"Modifier Prticipantes",
            useautoType:(part.autoType!==null),
            selectedPrticipantes:{
                id:part.id,
                Nom:part.Nom,
                Prenom:part.Prenom,
                IDp:part.IDp,
                Photo:part.Photo,
                Type:part.Type,
                autoType:part.autoType,
            }
        });
    }
/////////////////////////Actions in API
    deleteClick(id){
        if(window.confirm('Es-tu sûr?')){
            fetch(variables.API_URL+'Participant/'+id+'/',{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then((result)=>{
            this.refreshList()
            },(error)=>{console.error('Error:', error);this.refreshList();})
        }
    }
    emptyClick(){
        if(window.confirm('Êtes-vous sûr de vouloir vider la table?')){
            fetch(variables.API_URL+'empty_participant/')
            .then(res=>res.json())
            .then((result)=>{
                this.refreshList()
            },(error)=>{console.error('Error:', error);this.refreshList();})
        }
    }
    render(){
        const {
            Prticipantes,
            selectedPrticipantes,
            selectPrticipantes,
            modalTitle,
            useautoType
        }=this.state;
        return(
        <div>
            <div>
                <div className='tableIn'>
                    <div className='d-flex'>
                        <button onClick={()=>this.props.changePage('/')}  className="backbtn"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></button>
                        <h1 className='text-center' style={{width:"90%"}}>Les PARTICIPANTS</h1>
                    </div>
                    <div className='Patientsfunc'>
                        <div></div>
                        <button type="button" className="btn btn1 m-2 float-end" title='tout sélectionner' onClick={()=>this.checkAllCheckboxes()}>
                            <i class="bi bi-check2-all"></i>
                        </button>
                        <button type="button" className="btn btn1 m-2 float-end" title='tout sélectionner'data-bs-toggle="modal" data-bs-target="#AllCarprForm">
                            <i class="bi bi-printer"></i>
                        </button>
                        <button type="button" className="btn btn1 m-2 float-end" title='table vide' onClick={()=>this.emptyClick()}>
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <button type="button" className="btn btn1 m-2 float-end" 
                        data-bs-toggle="modal"data-bs-target="#PrticipantesForm" onClick={()=>this.addClick()}>
                            Ajouter Participant
                        </button>
                    </div>
                    <div className='FontTable'>
                    <table className="table">
                    <thead>
                    <tr>  
                        <th className='selectth'></th>              
                        <th className='thsideR'><span></span></th> 
                        <th><input className="form-control m-2" onChange={this.changePrticipantesIDFilter} placeholder="ID"/></th>              
                        <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changePrticipantesNomFilter} placeholder="Nom"/>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom',true)}>
                                    <i className="bi-arrow-down-circle-fill"></i>
                                </button>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom',false)}>
                                    <i className="bi-arrow-up-circle-fill"></i>
                                </button>
                            </div>
                        </th>
                        <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changePrticipantesPrenomFilter} placeholder="Prenom"/>
                                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Prenom',true)}>
                                        <i className="bi-arrow-down-circle-fill"></i>
                                    </button>
                                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Prenom',false)}>
                                        <i className="bi-arrow-up-circle-fill"></i>
                                    </button>
                            </div>
                        </th>
                        <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changePrticipantesTypeFilter} placeholder="Type"/>
                                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Type',true)}>
                                        <i className="bi-arrow-down-circle-fill"></i>
                                    </button>
                                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Type',false)}>
                                        <i className="bi-arrow-up-circle-fill"></i>
                                    </button>
                            </div>
                        </th>
                        <th className='thsideL'></th>
                    </tr>
                    </thead>
                    <tbody>
                        {Prticipantes.map(part=>
                            <tr key={part.id}>
                                <td className='selecttd'>
                                    <label class="checkbox-container">
                                        <input type="checkbox" onClick={(e)=>this.selectpart(e,part.id)}/>
                                        <svg viewBox="0 0 64 64" height="1.4em" width="1.4em">
                                            <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
                                        </svg>
                                    </label>
                                </td>
                                <td className='lineTd'>
                                    <img src={part.Photo} width='80px' height='80px'/>
                                </td>
                                <td>{part.IDp}</td>
                                <td>{part.Nom}</td>
                                <td>{part.Prenom}</td>
                                <td>
                                    {part.autoType!==null?part.autoType:
                                    <>{this.getTypeName(part.Type) +" ("+ this.getTypeDesc(part.Type)+")"}</>}
                                </td>
                                <td className='endTd'>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <ul class="dropdown-menu menu-pr">
                                        <li>
                                            <button type="button" className="btn btn-light mr-1"
                                            data-bs-toggle="modal" data-bs-target="#PrticipantesForm" onClick={()=>this.editClick(part)}>
                                                <i className="bi-pencil-square"></i> Modifier
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(part.id)}>
                                                <i className="bi-trash"></i> Supprimer
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" data-bs-toggle="modal" data-bs-target="#CarprForm" className="btn btn-light mr-1"  onClick={()=>this.editClick(part)}>
                                                <i class="fa fa-print" aria-hidden="true"></i> Cart
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                            )}
                    </tbody>
                   
                 </table>
                 </div>
                <FormPrticipantes getMaxidPr={this.getMaxidPr} GetDate={this.props.GetDate} selectedPrticipantes={selectedPrticipantes} modalTitle={modalTitle} useautoType={useautoType} refreshList={()=>this.refreshList()}/>
                <CartParticipante selectedPrticipantes={selectedPrticipantes} Info={this.props.Info} getTypeDesc={this.getTypeDesc} getTypeName={this.getTypeName}/>
                <AllCartParticipante selectPrticipantes={selectPrticipantes} Info={this.props.Info} getTypeDesc={this.getTypeDesc} getTypeName={this.getTypeName}/>
                </div>
            </div>
        </div>
        )
    }
}