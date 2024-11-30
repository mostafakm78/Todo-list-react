import { useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid'
import Inputnumber from './../components/InputNumber.jsx'
import { useEffect } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useReducer } from "react";
import todoReducer from "../reducer/todoreducer.js";
import { TodoContext } from "../context/TodoContext.js";


export default function Todo() {
    // let [todos, setTodo] = useState([])
    let [ todos , todoDispather ] = useReducer( todoReducer , [])

    const FocusRef = useRef(null)

    const getDatafromAPI = async () => {
        try {
            let res = await fetch("https://6743322db7464b1c2a63f392.mockapi.io/Todo")
            let todos = await res.json()

            if (res.ok) {
                todoDispather({
                    type : 'initial-list',
                    todos
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        getDatafromAPI()
        // setTodo( JSON.parse(localStorage.getItem("MyData")) ?? [])
    } , [])


    // useEffect( () => {
    //     localStorage.setItem("MyData" , JSON.stringify(todos))
    // } , [todos])

    const [ inputvalue , SetInputvalue ] = useState("")

    function inputevent(event) {
        SetInputvalue(event.target.value)
    }

    const TodoInputClick = async () => {

        let newData = {
            id: uuidv4(),
            title: inputvalue,
            status: false
        }

        try {
            let res = await fetch('https://6743322db7464b1c2a63f392.mockapi.io/Todo', {
                method: 'post',
                headers: {'content-type':'application/json'},
                body : JSON.stringify(newData)
            })

            let NewRes = await res.json()

            if (inputvalue !== "") {
                todoDispather({
                    type : 'add',
                    title : NewRes?.title,
                    id : NewRes?.id
                })
                FocusRef.current.focus()
                SetInputvalue("")
            }
            toast.success('Todo Created!')
        } catch (error) {
            toast.error(error)
        }
    }

    const TodoInput = async (event) => {
        let newData = {
            id: uuidv4(),
            title: inputvalue,
            status: false
        }

        try {
            if (event.key === 'Enter' && inputvalue !== "") {
            let res = await fetch('https://6743322db7464b1c2a63f392.mockapi.io/Todo', {
                method: 'post',
                headers: {'content-type':'application/json'},
                body : JSON.stringify(newData)
            })

            let NewRes = await res.json()


                todoDispather({
                    type : 'add',
                    title : NewRes?.title,
                    id : NewRes?.id
                })

                SetInputvalue("")
                toast.success("Todo Created!")
            }
        }catch (error) {
            toast.error(error)
        }
        }

        // let [ value , Setvalue] = useState(0)
        let value = todos.length
        // Setvalue = todos.length

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white mt-6">
                <div className="flex items-center mb-6">
                    <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
                </div>
                <div className="relative">
                    <input ref={FocusRef} type="text" placeholder="What needs to be done today?"
                        onKeyDown={TodoInput} onChange={inputevent} value={inputvalue}
                        className="w-9/12 ml-4 px-2 py-3 border rounded outline-none border-gray-600" />
                        <button className="ml-2 w-2/12 border border-gray-600 px-2 py-3 rounded text-purple-600 hover:bg-purple-600 hover:text-gray-50 duration-500"
                        onClick={TodoInputClick} >Add</button>
                </div>
                <TodoContext.Provider value={{
                    todos,
                    todoDispather
                }}>
                <TodoList todos={todos}/>
                </TodoContext.Provider>
            </div>
            <Inputnumber InputNumber={value} />
        </div>
    )
}
