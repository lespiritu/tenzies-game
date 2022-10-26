
import {FaDiceD6,FaDiceOne,FaDiceTwo,FaDiceThree,FaDiceFour, FaDiceFive ,FaDiceSix } from 'react-icons/fa';





export default function Dies(props){

   

    const diceBgColor = props.held? '#009a97' : '#332b44';
    const styleDie = {
        color:`${diceBgColor}`   
    }

   
    switch(props.value){
        case 1: return <FaDiceOne style={styleDie} onClick={props.heldHandler} className='dies'/>;
        case 2: return <FaDiceTwo style={styleDie} onClick={props.heldHandler} className='dies'/>;
        case 3: return <FaDiceThree style={styleDie} onClick={props.heldHandler} className='dies'/>;
        case 4: return <FaDiceFour style={styleDie} onClick={props.heldHandler} className='dies'/>;
        case 5: return <FaDiceFive style={styleDie} onClick={props.heldHandler} className='dies'/>;
        case 6: return <FaDiceSix style={styleDie} onClick={props.heldHandler} className='dies'/>;
        default: return <FaDiceD6 style={styleDie} onClick={props.heldHandler} className='dies'/>;
    }

    // return(
    //     // <div style={styleDie} onClick={props.heldHandler}  className='dies'>
    //     //    <h2>{props.value}</h2>
    //     // </div>

    //     <FaDiceTwo style={styleDie} onClick={props.heldHandler} className='dies'/>
       

    // )
}