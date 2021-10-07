import './App.css';
import Gun from 'gun'
import {useEffect, useState} from 'react'

const gun = Gun({
  peers: ['http:localhost:8000/gun']
})

function App() {

  const [txt, setTxt] = useState()

  useEffect(() => {
   
    gun.get('text').once((node) => {
      console.log(node)
      if(node == undefined) {
        gun.get('text').put({text: "Write the text here"})
      } else {
        console.log("Found Node")
        setTxt(node.text)
      }
    })

    gun.get('text').on((node) => {
      console.log("Receiving Update")
      console.log(node)
      setTxt(node.text)
    })
  }, [])

  const updateText = (event) => {
    console.log("Updating Text")
    console.log(event.target.value)
    gun.get('text').put({text: event.target.value})
    setTxt(event.target.value)
  }

  return (
    <div className="App">
      <h1>Collaborative Document With GunJS</h1>
      <textarea value = {txt} onChange = {updateText}/>
    </div>
    
  );
}

export default App;
