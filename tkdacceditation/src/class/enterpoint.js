import React, { useEffect } from 'react';

export function Enterpoint({changePage}){
    return(<> 
        <section className='enterpoint'>
            <div>
                <div className='ENTPOINT-TOP'>
                    <img width='100px' src='./static/PIC/logoLaissance.png' />
                    <img width='120px' height='70px' src='./static/PIC/wtimg.png' />
                </div>
                <h1 className='text-center'>Service Accréditation</h1>
                <div>
                    <button className='btn1' onClick={()=>changePage('Prticipantes')} >Les PARTICIPANTS</button>
                    <button className='btn1' onClick={()=>changePage('Info')}>Info</button>
                </div>
            </div>
        </section>
    </>)
}