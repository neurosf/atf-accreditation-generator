import React, { useRef,useState, useEffect } from 'react';
import { variables } from '../Variables';
const AllCartParticipante = (props) => {
  const pdfRef = useRef();

  const PrintFacture = () => {
    const element = pdfRef.current;
    const printableWindow = window.open('', '_blank');
    const style = printableWindow.document.createElement('style');
    style.innerHTML = `
          .Allcarts{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          form.modal-body {
            width: 380px;
            height: 530px;
          }
          .top-cart{
            display: flex;
            justify-content: space-between;
            width: 360px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url(`+variables.PHOTO_URL+`const/backgroundtop.jpg);
            padding: 10px;
          }
          .top-cart .Top-title {
            width: 280px;
            text-align: center;
            color: black;
            font-family: sans-serif;
          }
          .top-cart h2 {
            font-size: 21px;
            font-weight: 600;
            font-family: system-ui;
            color: #0E1822;
            text-shadow: 2px 2px 2px white;
          }
          .top-cart h3 {
            font-size: 19px;
            font-family: monospace;
            color: #5b5b5b;
            margin: 0;
          }
          .top-cart h4{
            margin: 0;
          }
          .body-cart{
            display: flex;
            padding: 1%;
            margin: 3%;
          }
          .Img-cont{
            text-align: center;
            height: 130px;
            width: 130px;
            border: solid 1px #d3bebe;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .Img-cont img{
            height: 130px;
            max-width: 130px;
          }
          .code-type{
            font-size: 25px;
            font-weight: 800;
            text-align: center;
            color: #434040; 
            margin: 0;
          }
          p.Info-pr {
            font-size: 20px;
            font-weight: 600;
            margin: 1%;
            margin-left: 15px;
          }
          .Info-cont {
            width: 100%;
          }
          div p.Info-pr-Type{
            font-weight: 700;
            font-size: 22px;
            letter-spacing: 1px;
            height: 60px;
            text-align: center;
          }
          div.flag{
            text-align: end;
            height: 137px;
          }
          div.flag img {
            margin-top: 20px;
          }
          .title-flag{
            width: 100px;
            text-align: center;
            margin-left: auto;
            font-size: large;
            font-weight: 600;
          }
          .ID-pr{
            text-align: center;
            font-size: initial;
            font-weight: 700;
            letter-spacing: 2px;
            width: 160px;
          }
          .logoimgcont{
            width: 100px;
          }
          .bot-cart{
            height: 105px;
            width: 380px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url(`+variables.PHOTO_URL+`const/backgroundbot.jpg);
          }
          .bot-cart div{
            justify-content: center;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }
          .bot-cart p {
            text-align: center;
            font-weight: 600;
            background: lavender;
          }
          .rang-box {
            color: white;
            width: 30px;
            height: 30px;
            margin: 1%;
            text-align: center;
            font-size: larger;
            font-weight: 800;
          }
          .rang-box.box-plus {
            outline: solid #979fc3;
            border: solid #ffffff;
          }
          .bot-cart label {
            display: block;
            width: 100%;
            text-align: center;
            font-weight: 600;
            color: #97112a;
          }
    `;
    printableWindow.document.write(style.outerHTML);
    printableWindow.document.write(element.outerHTML);
    setTimeout(() => {
      printableWindow.document.write(`
        <script>
          window.print();
          window.close();
        </script>
      `);
    }, 1000);
  };
  const {
    selectPrticipantes,
    Info
  } = props;

  return (
    <>
      <div className="modal fade" id="AllCarprForm" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content"  style={{ width: "500px", margin: "auto" }}>
            <div className="modal-header">
              <h5 className="modal-title">Cart Accréditation</h5>
              <div className='d-flex'>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
              <section className='Allcarts' ref={pdfRef} style={{padding: 0}}>
              {selectPrticipantes.map(selectedPrticipantes=>(<>
                    <form className="modal-body"style={{padding: 0}}>
                        <div className='top-cart'>
                            <div className='logoimgcont'><img width='60px' src={variables.PHOTO_URL+'const/logoLaissance.png'} /></div>
                            <div className='Top-title'>
                              <h2>{Info.event}</h2>
                              <h3>{Info.date}</h3>
                              <h4>{Info.lieu}</h4>
                            </div>
                            <div className='logoimgcont'><img width="100px" src={variables.PHOTO_URL+'const/wtimg.png'} /></div>
                        </div>
                        <div className='body-cart'>
                            <div>
                                <p className='code-type'>{props.getTypeName(selectedPrticipantes.Type)}</p>
                                <div className='Img-cont'>
                                    <img src={selectedPrticipantes.Photo} />
                                </div>
                                <p className='ID-pr'>{selectedPrticipantes.IDp}</p>
                            </div>
                           <div className='Info-cont'>
                                <p className='Info-pr'>{selectedPrticipantes.Nom}</p>
                                <p className='Info-pr'>{selectedPrticipantes.Prenom}</p>
                                <p className=' Info-pr Info-pr-Type'>
                                {selectedPrticipantes.autoType!==null?selectedPrticipantes.autoType:
                                    <>{props.getTypeDesc(selectedPrticipantes.Type)}</>}</p>
                                <div className='flag'>
                                    <img height='50px' src={variables.PHOTO_URL+'const/algflag.jpg'} />
                                    <p className='title-flag'>ALG</p>    
                                </div>
                            </div> 
                        </div>
                        <div className='bot-cart'>
                          <label>Algerian Taekwondo Federation</label>
                          <div>
                            {Info.places.map(I=>(
                              <div className={'rang-box ' + (I.rang<=selectedPrticipantes.Type?'box-plus':'')} style={{background:I.color}}>{I.rang<=selectedPrticipantes.Type?I.id:''}</div>
                            ))}
                          </div>
                          <p>by B.ismail & S.yacine</p>
                        </div>
                    </form>
                  </>))}
                </section>
                    <div className='d-flex'>
                        <button className='btn3 w-50 m-1' onClick={PrintFacture}>Printe Certificate</button>
                    </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AllCartParticipante;