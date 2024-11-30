import { useContext } from "react";
import TodoListItem from "./TodoListItem";
import { TodoContext } from "../context/TodoContext";


export default function TodoList() {
    const {todos} = useContext(TodoContext)

    return (
        <ul className="list-reset">
                        { todos.map((todo , index) => <TodoListItem key={index} todo={ todo }/>) }
                    </ul>
    )
}
