import { useState } from 'react'
import './App.css'
import CalendarApp from './CalendarApp'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     <CalendarApp/>
    </div>
  )
}

export default App
