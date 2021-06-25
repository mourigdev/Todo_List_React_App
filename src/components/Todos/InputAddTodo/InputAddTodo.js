import { useRef, useState } from "react";
import "./input.css";
const InputAddTodo = (props) => {
  const todoText = useRef();

  const [text, setText] = useState("");
  const [textIsValid, setTextIsValid] = useState(true);

  const InputChangesHandler = () => {
    setText(todoText.current.value);
  };
  const InputFocus = () => {
    setTextIsValid(true);
  };

  const InputAddTodoHundler = (e) => {
    e.preventDefault();
    if (todoText.current.value.trim().length === 0) {
      setTextIsValid(false);
      return;
    } else {
      setTextIsValid(true);
    }
    props.onAddNewTodod(text);
    setText("");
    todoText.current.value = "";
  };

  return (
    <div className="containerForm">
      <form onSubmit={InputAddTodoHundler}>
        <div className="firstDiv">
          <div className="secondDiv">
            <div className="titlePContainer">
              <label
                htmlFor="input"
                className={textIsValid ? "validLabel" : "notValidLabel"}
              >
                  {textIsValid ? " What's The Goals of Today Mr Abdellah?" : "Mr Abdellah Please Enter a valid Task don't be stupid"}

               
              </label>
            </div>
            <div className="inputContainer">
              <input
                id="input"
                className={textIsValid ? "valid" : "notValid"}
                type="text"
                onChange={InputChangesHandler}
                onFocus={InputFocus}
                ref={todoText}
              />

              <button type="submit">Add</button>
            </div>
            {/* {textIsValid ? null : <p>Enter Valid Todo</p>} */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputAddTodo;
