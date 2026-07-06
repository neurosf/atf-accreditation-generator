import React,{Component} from 'react';
import { variables } from '../Variables';

export class FormPrticipantes  extends Component{

    constructor(props){
        super(props);
        this.state={
            SavedImage:null,
            useautoType:false
        }
    }
//////////////////////set state var
    changePrticipantesNom =(e)=>{
        let X= this.props.selectedPrticipantes;
        X.Nom = e.target.value
        this.setState({selectedPrticipantes:X});
    }
    changePrticipantesID =(e)=>{
        let X= this.props.selectedPrticipantes;
        X.IDp = e.target.value
        this.setState({selectedPrticipantes:X});
    }
    changePrticipantestype =(e)=>{
        let X= this.props.selectedPrticipantes;
        X.Type = e.target.value;
        this.setState({selectedPrticipantes:X});
    }
    changePrticipantesPrenom =(e)=>{
        let X= this.props.selectedPrticipantes;
        X.Prenom = e.target.value
        this.setState({selectedPrticipantes:X});
    }
    selectImage=(e)=>{
        this.setState({SavedImage:e.target.files[0]});
        this.readURL(e);
    }
    readURL=(e)=>{
        if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById(('ImageSelected')).setAttribute('src', e.target.result)
        };
        reader.readAsDataURL(e.target.files[0]);
        }
    }
    changeuseautoType=(e)=>{
        this.setState({useautoType:e.target.checked})
        let X= this.props.selectedPrticipantes;
        if(e.target.checked){
            this.setState({selectedPrticipantes:X})
        }else{
            this.setState({selectedPrticipantes:X})
        }
    }
    changePrticipantesautoType=(e)=>{
        let X= this.props.selectedPrticipantes;
        X.autoType = e.target.value
        this.setState({selectedPrticipantes:X});
    }
/////////////////////////Actions in API
    SubmitPrticipantes=(e)=>{ 
        e.preventDefault(); 
        if(this.props.selectedPrticipantes.id===0){
            this.createClick()
        }
        else{
            this.updateClick()
        }
    }
    createClick(){
        const formData = new FormData();
        if(this.state.SavedImage!==null){
            this.props.selectedPrticipantes.Photo = this.state.SavedImage;
        }else{
            delete this.props.selectedPrticipantes.Photo;
        }
        if(!this.state.useautoType){
            delete this.props.selectedPrticipantes.autoType ;
        }else{
            this.props.selectedPrticipantes.Type = 5;
        }
        const date = this.props.GetDate().slice(2, 10).replace(/-/g, '');
        const num = this.props.getMaxidPr();
        this.props.selectedPrticipantes.IDp = `ATF-${date}${num.toString().padStart(4, '0')}`;

        for (const key in this.props.selectedPrticipantes) {
            formData.append(key, this.props.selectedPrticipantes[key]);
        }
        fetch(variables.API_URL+'Participant/',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
           this.props.refreshList()
           this.CloseModel('PrticipantesForm')
        },(error)=>{console.error('Error:', error);})
    }
    updateClick(){
        const formData = new FormData();
        
        if(this.state.SavedImage!==null){
            this.props.selectedPrticipantes.Photo = this.state.SavedImage;
        }else{
            delete this.props.selectedPrticipantes.Photo;
        }
        if(!this.state.useautoType){
            delete this.props.selectedPrticipantes.autoType ;
        }else{
            this.props.selectedPrticipantes.Type = 5;
        }
        for (const key in this.props.selectedPrticipantes) {
            formData.append(key, this.props.selectedPrticipantes[key]);
        }
        fetch(variables.API_URL+'Participant/'+this.props.selectedPrticipantes.id+'/',{
            method:'PUT',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
           this.props.refreshList()
           this.CloseModel('PrticipantesForm')
        },(error)=>{console.error('Error:', error);})
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'Participant/'+id+'/',{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then((result)=>{
            this.props.refreshList()
            },(error)=>{console.error('Error:', error);this.props.refreshList();})
        }
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
    componentDidUpdate(prevprops){
        if(this.props.useautoType!=prevprops.useautoType){
            this.setState({useautoType:this.props.useautoType});
        }
    }
    render(){
        const {
            selectedPrticipantes,
            modalTitle,
        }=this.props;
        const {
            useautoType
        }=this.state;
        return(
        <div>
        <form className="modal fade" id="PrticipantesForm" tabIndex="-1" aria-hidden="true" onSubmit={(e)=>this.SubmitPrticipantes(e)}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                    <div className="p-2 w-100 bd-highlight">
                        {selectedPrticipantes.id!==0?
                        <button type="button" className="btn btn-light m-2" onClick={()=>this.deleteClick(selectedPrticipantes.id)}>
                            <i className="bi-trash"></i>
                        </button>:null}
                        <div className=" inputgroup mb-3">
                            <input type="text" value={selectedPrticipantes.Nom} onChange={this.changePrticipantesNom} required/>
                            <span>Name</span>
                        </div>
                        <div className=" inputgroup mb-3">
                            <input type='text' value={selectedPrticipantes.Prenom} onChange={this.changePrticipantesPrenom} required/>
                            <span>Prenom</span>
                        </div>
                        {selectedPrticipantes.id!==0?
                        <div className=" inputgroup mb-3">
                            <input type="text" value={selectedPrticipantes.IDp} onChange={null} />
                            <span>ID</span>
                        </div>:null}
                        <div className='checkIn'>
                            <label class="checkbox-container">
                            <input type="checkbox" checked={useautoType} onClick={this.changeuseautoType}/>
                            <svg viewBox="0 0 64 64" height="1.4em" width="1.4em">
                                <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
                            </svg>
                            </label>
                            <p>rédigé type</p>
                        </div>
                        <div className=" inputgroup mb-3">
                            {!useautoType?
                            <select value={selectedPrticipantes.Type}onChange={this.changePrticipantestype} required>
                                <option value={1}>P (Player)</option>
                                <option value={2}>C (Coach)</option>
                                <option value={3}>R (Referee)</option>
                                <option value={4}>OC (Organising Committee)</option>
                                <option value={5}>VIP (Fédération)</option>
                            </select>:
                            <input type='text' value={selectedPrticipantes.autoType} onChange={this.changePrticipantesautoType} required/>
                            }
                            <span>Type</span>
                        </div>
                    </div>
                    <div>
                        <div className='d-flex flex-column m-2'>
                            <img src={selectedPrticipantes.Photo} id="ImageSelected" alt="" width='150px'></img>
                            <label class="custom-file-upload">
                                <input type="file" onChange={this.selectImage}/>
                                selectione une image
                            </label>
                        </div>
                    </div>
                </div>

                {selectedPrticipantes.id===0?
                    <button type="submit"className="btn3 float-start" >Create</button>
                    :null}

                {selectedPrticipantes.id!==0?
                    <>
                    <button type="submit" className="btn3 float-start" >Update</button>
                    </>
                    :null}
            </div>

            </div>
            </div> 
        </form>
    </div>
        )
    }
}