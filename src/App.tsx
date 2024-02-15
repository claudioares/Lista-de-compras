import { useReducer, useState } from "react"
import { randomId } from "./utils/randomId";
        

type Task = {
  id: number;
  text: string;
}

const initialState:Task[] = [];

type Action = | {
  type: "add"; 
  text: string
} | {
  type: "remove"; 
  id: number
} | { 
  type: "removeAll"
}

function reducer (_state:Task[], _action:Action) {
  switch(_action.type){
    case 'add':
      return[
        ..._state,
        {id: randomId(), text:_action.text}
      ]
    
    case 'remove':
      return _state.filter((task)=> task.id !== _action.id)
    
    case 'removeAll':
      return _state = []
  }
}

function App() {

  const [input, setInput] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState)

  function addTask () {
    dispatch({type: 'add', text:input})
    setInput('')
  }

  return (
    <>
        <div className="text-zinc-100 max-w-[144rem] h-screen bg-black flex flex-1 flex-col gap-10 items-center justify-center pt-10">
          <h1 className="font-medium text-4xl">Lista de tarefas</h1>
            <form className="text-3xl font-light text-slate-200 flex flex-col gap-6 items-center">
              <input type="text" className="w-96 h-12 rounded-lg pl-4 text-zinc-900 text-2xl font-semibold" value={input} onChange={(e)=>setInput(e.target.value)}/>
              <div className="w-full flex items-center justify-center">
                <button onClick={()=>dispatch({type:'removeAll'})} className="w-40 h-12 text-lg rounded-md bg-pink-900">Remover todos</button>
              </div>
              <button onClick={()=>addTask()} type="button" className="w-40 h-12 text-lg rounded-md bg-green-700">Adicionar</button>
            </form> 

            <br />

            <ul className="flex flex-1 flex-col items-start gap-4">
              {state.map((task)=>(
                <li key={task.id} className="flex items-center justify-start gap-7">
                  <button onClick={()=>dispatch({type:'remove', id:task.id})} className="text-pink-800 text-lg">remove</button>
                  <input type="checkbox" className="text-zinc-100 text-4xl w-8 h-8" />
                  <label className="text-4xl">{task.text}</label>
                </li>
              ))}
            </ul>
        </div>
    </>
  )
}

export default App
