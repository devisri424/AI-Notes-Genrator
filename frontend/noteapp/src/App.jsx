import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [topic,setTopic] = useState("")
  const [notes,setNotes]=useState("")
  const generateNotes=async () =>{
    setNotes("Generating notes...........")
  

  const response= await fetch("http://127.0.0.1:5000/generate",{
    method:"POST",
    headers:{
      "content-Type":"application/json"
    },
    body:JSON.stringify({topic})
  }
  );
  const data=await response.json();
  setNotes(data.notes||data.error);
  }
  return (
    <div style={{padding:"40px",fontFamily:"Arial"}}>
      <h1>AI Notes Generator</h1>
      <textarea
        rows="5" style={{width:"100%",fontSize:"16px"}}
        placeholder="Enter topic..."
        value={topic}
        onChange={(e)=>setTopic(e.target.value)}
      />
      <br/><br/>
      <button onClick={generateNotes}>
        Generate Notes
      </button>
      <pre style={{marginTop:"20px",background:"#f4f4f4",padding:"15px"}}>
        {notes}
      </pre>
      
    </div>
  )
}

export default App;
