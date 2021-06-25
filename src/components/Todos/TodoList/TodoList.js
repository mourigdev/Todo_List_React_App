import TodoItem from "../TodoItem/TodoItem";
import "./todolist.css"

const TodoList = (props) =>{


    return (
        <div className="todosContainer">

    <ul>
        {
        // return Array of TodoItems
        props.items.map(item=>{
            return(
            <TodoItem key={item.id} id={item.id} done={item.done} onDelete={props.onDelete} onDoneEdit={props.onDoneEdit}>
                {item.bodyText}
            </TodoItem>
            )
        })
        }

    </ul>

    </div>


    )
}

export default TodoList;