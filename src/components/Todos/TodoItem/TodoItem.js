import "./todoitem.css";
// import { BsFillXCircleFill } from "react-icons/bs";
const TodoItem = (props) =>{

    const deleteHandler = () =>{
        props.onDelete(props.id)
    }

    const DoneHandler = (e) =>{
        if(e.target.className !== 'ri-close-circle-line'){
            props.onDoneEdit(props.id,props.done)
        }
    }

    return(
        <li onClick={DoneHandler} className={`todoItem ${props.done ? props.done : null}`}>
            <p>{props.children}</p>
            <div className='deleteThis'>
            <i className="ri-close-circle-line" onClick={deleteHandler}></i>
            </div>
        </li>
    )
}

export default TodoItem;