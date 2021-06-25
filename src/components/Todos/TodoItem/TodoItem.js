import "./todoitem.css";
const TodoItem = (props) =>{

    const deleteHandler = () =>{
        props.onDelete(props.id)
    }

    return(
        <li onClick={deleteHandler} className="todoItem">
            {props.children}
        </li>
    )
}

export default TodoItem;