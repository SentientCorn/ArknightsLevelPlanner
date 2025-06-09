import { useState } from 'react'
// import supabase from './config/supabase'
import './styles.css'

function App() {

  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div>
        <button onClick={() => setCount(count + 1)}>
          Count is: {count}
        </button>
      </div>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
        <p>You typed: {text}</p>
      </div>
    </div>
  )
}

export default App
