import { useContext, useState } from "react";
import DeleteIcon from "./Icon/DeleteIcon";
import EditIcon from "./Icon/EditIcon";
import { toast } from "react-toastify";
import { TodoContext } from "../context/TodoContext";


export default function TodoListItem({todo}) {
    const [ editmode , seteditmode ] = useState(false)
    const { todoDispather } = useContext(TodoContext)

    const editTodo = (event) => {
        if(event.key === 'Enter') {
            TodoEdit(todo , event.target.value)
            seteditmode(false)
        }
    }

    let RemoveTodo = async (todo) => {

        let res = await fetch(`https://6743322db7464b1c2a63f392.mockapi.io/Todo/${todo?.id}` , {
            method: 'DELETE',
        })

        if (res.ok) {
            todoDispather({
                type : 'delete',
                id : todo.id
            })

            toast.info("Todo Deleted!")
        }
        let msg = await res.json()
        toast.error(msg)
    }

    let TodoChecked = async (todo) => {

        let res = await fetch(`https://6743322db7464b1c2a63f392.mockapi.io/Todo/${todo?.id}` ,{
            method: 'put',
            headers: {'content-type':'application/json'},
            body : JSON.stringify({
                status : !todo.status
            })
        })

        if ( res.ok ) {
            todoDispather({
                type : 'toggle',
                id : todo.id
            })

            toast.info("Todo Checked!")
        }
    }

    let TodoEdit = async (todo, newtitlevalue) => {

        let res = await fetch(`https://6743322db7464b1c2a63f392.mockapi.io/Todo/${todo?.id}` ,{
            method: 'put',
            headers: {'content-type':'application/json'},
            body : JSON.stringify({
                title : newtitlevalue
            })
        })

            if ( res.ok ) {
                todoDispather({
                    type : 'edit',
                    id : todo.id,
                    newtitle : newtitlevalue
                })

                toast.success("Todo Edited!")
            }
    }


    return (
        <li className="relative flex items-center justify-between px-2 py-6 border-b">
                        {
                            editmode
                            ? <div className="w-full flex items-center">
                            <input type="text" defaultValue={todo?.title} onKeyDown={editTodo} onChange={() => {}} className="w-full py-2 px-4 border border-gray-200 rounded" />
                            <DeleteIcon className="ml-2" onClick={ () => {seteditmode(false)}}/>
                            </div>
                            :
                                <>
                                <div>
                                <input type="checkbox" checked={todo?.status} onChange={() => TodoChecked(todo)} className="" />
                                <p  className={`inline-block mt-1 ml-2 text-gray-600 ${todo?.status ? 'line-through' : ''}`}>{ todo?.title }</p>
                                </div>
                                <button type="button" className="absolute right-0 flex items-center space-x-1">
                                    <EditIcon onClick={() => {seteditmode(true)}} />
                                    <DeleteIcon onClick={ () => RemoveTodo(todo)}/>
                                </button>
                                </>
                        }
                        </li>
    )
}
