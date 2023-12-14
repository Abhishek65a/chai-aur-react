import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberallowed,setNumberAllowed]=useState(false);
  const [characterallowed,setCharacterAllowed]=useState(false);
  const[password,setPassword]=useState("")

  //useRef hook

  const passwordRef=useRef(null)

  const passwordgenerator= useCallback(()=>
  {
    let pass=""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallowed) str += "0123456789"
    if(characterallowed) str += "!@#$%^&*"

    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length,numberallowed,characterallowed,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordgenerator()
  },[length,numberallowed,characterallowed,passwordgenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>

        <h1 className='text-white text-center my-3'>Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">

          <input type="text" 
                 value={password}
                 className='outline-none w-full py-1 px-3'
                 placeholder='Password' 
                 readOnly
                 ref={passwordRef}/>

                 <button onClick={copyPasswordToClipboard}
                  className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0' >
                  COPY
                 </button>
        </div>


        <div className='flex text-sm gap-x-2'>

          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}} />
            <label>Length:{length}</label>
          </div>


          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked ={numberallowed}
            id='numberInput'
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }} 
            />
          <label htmlFor='numberInput'>Numbers</label>
          </div>

          
          <div className='flex items-center gap-x-1'>
           <input type="checkbox"
                  defaultChecked ={characterallowed}
                  id='characterInput'
                  onChange={()=>{
                    setCharacterAllowed((prev)=>!prev)
                  }}
            />
            <label htmlFor='characterInput'>Characters</label>
          </div>

        </div>
      </div>

    </>
  )
}

export default App
