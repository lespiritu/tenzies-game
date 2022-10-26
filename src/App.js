
import { useEffect, useState } from 'react';
import './App.css';
import Dies from './dies';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import { FaChevronDown,FaChevronUp } from 'react-icons/fa';


function App() {

const allNewDies = (diceNumber)=>{
  const allDies=[];
  for (let i = 0; i < 10; i++) {
    allDies.push({
      value:Math.ceil(Math.random() * diceNumber), 
      held: false,
      id: nanoid()
    });
  }

  return allDies;
}


const [dice, setDice] = useState(allNewDies(0));




function heldHandler(id){
  setDice(previous => previous.map(item =>item.value > 0 && item.id === id ? {...item, held: !item.held} : {...item}))
}


const [tenzies, setTenzies] = useState(false);

useEffect(()=>{
  const allHeld = dice.every(die=>die.held);
  const allSameValue = dice.every(die=> die.value === dice[0].value);

  if(allHeld && allSameValue){
    setTenzies(true);
  }
},[dice])




const [move,setMove] = useState(0);
const [record,setRecord] = useState(JSON.parse(localStorage.getItem('records')) || []);

useEffect(()=>{
  localStorage.setItem('records', JSON.stringify(record))
},[record])

const rolldice = ()=>{

  if(tenzies){
    setTenzies(false);
    setDice(allNewDies(0));
    setMove(0);
    setRecord(previous=>[ {moves: move}, ...previous]);
   
  }
  else{
    setDice(previous=>previous.map(item=> item.held ? {...item} : {...item, value: Math.ceil(Math.random() * 6)}));

    setMove(previous=>previous+1);
  }
  
}




const [recordsView, setRecordView] = useState(false);

const sortedRecords = record.sort((a,b)=> a.moves - b.moves).slice(0,5);

  




function recordViewHandler(){
  setRecordView(previous=>!previous)
}
const styles ={
  height: recordsView ? 'auto' : '19px',
  userSelect:'none',
  cursor:'pointer',
  overflow:'hidden',
  position:'absolute',
  backgroundColor:'#9797979e',
  color:'white',
  padding:'5px',
  top:'20px',
  left:'20px',
  borderRadius:'5px',
  transition:'ease-in-out',
  fontSize:'14px'
}

const diseElkements = dice.map(item=> {
  return <Dies key={item.id} heldHandler={()=>heldHandler(item.id)} {...item}/>
})



  return (
    <div className="App">

{tenzies && <Confetti confettiSource={{ x: 0, y: 0, w: window.innerWidth, h: window.innerHeight }}/>}

      <div style={{position:'absolute',top:'20px', right:'20px',margin:'0', backgroundColor:'#ff0059',color:'white',padding:'5px',borderRadius:'5px'}}>
        <span style={{fontWeight:'bold'}}>moves: {move}</span>
      
      
      </div>

      <div onClick={recordViewHandler} style={styles}>
        <span style={{display:'flex',gap:'5px', justifyContent:'center', alignItems:'center'}}>Records {recordsView ? <FaChevronUp/> : <FaChevronDown/>}</span>
      <ul style={{padding:'0', margin:'5px auto'}}>
        {sortedRecords.map((item,index)=><li style={{color:'white',listStyle:'none'}} key={index}>moves: {item.moves}</li>)}
        </ul>
      </div>
      
      
      <h1 className='title'> Tenzies </h1>
      <p>
      Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
    <main>
      {diseElkements}
    </main>

    <button onClick={rolldice}>{tenzies? 'Play Again' : 'Roll'}</button>
    </div>
  );
}

export default App;
