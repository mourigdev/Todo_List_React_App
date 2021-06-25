import { useState, useEffect } from "react";
import TodoList from "./components/Todos/TodoList/TodoList";
import InputAddTodo from "./components/Todos/InputAddTodo/InputAddTodo";
import "./App.css";
import Footer from "./components/footer/Footer";
function App() {
  // const data = [
  //   {
  //     id : 'todo1',
  //     bodyText : 'I will Insha2llah Learn React'
  //   },
  //   {
  //     id : 'todo2',
  //     bodyText : 'Practice React Today Inshaelah'
  //   }
  // ]

  const [IsLoading, SetIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const Affichage = () => {
    {
      SetIsLoading(true);
      fetch("https://todos-af6ae-default-rtdb.firebaseio.com/todos.json", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const allTodos = [];
          for (const key in data) {
            const todo = {
              id: key,
              ...data[key],
              
            };
            allTodos.push(todo);
            allTodos.reverse();
          }
          SetIsLoading(false);
          setItems(() => {
            return allTodos;
          });
        });
    }
  };

  useEffect(Affichage, []);

  const DeleteClickedTodo = (id) => {
    console.log(id);

    fetch(`https://todos-af6ae-default-rtdb.firebaseio.com/todos/${id}.json`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response)
        console.log(response.status)
        if (response.status === 200) {
          console.log("yes")
          setItems(
            previousItems=>{
              const updateItems = previousItems.filter( item=> item.id !== id )
              return updateItems;
        }
        )
        }
        return response.json();
      })
      // .then((data) => {
      //   console.log(data)
      //   // Affichage();
      //   setItems(
      //     previousItems=>{
      //       const updateItems = previousItems.filter( item=> item.id !== id )
      //       return updateItems;
      // }
      // )
      // });
  };

  const AddNewTodo = (TodoText) => {
    fetch("https://todos-af6ae-default-rtdb.firebaseio.com/todos.json", {
      method: "POST",
      body: JSON.stringify({
        bodyText: TodoText,
      }),
    }).then((response) => {
      // Affichage()
      if(response.status === 200){
        setItems((previousItems) => {
          const updatedData = [...previousItems];
          updatedData.unshift({
            
            bodyText: TodoText,
          });
          return updatedData;
        });
      }

    });

    // setItems(previousItems=>{
    //   const updatedData = [...previousItems];
    //   updatedData.unshift({
    //   id: Math.random().toString(),
    //   bodyText : TodoText
    // })
    // return updatedData;
    // })
  };

  //   if(IsLoading){
  //     return(
  //         <div>
  //             <p>Loading...</p>
  //         </div>
  //     )

  // }

  return (
    <div>
      <InputAddTodo onAddNewTodod={AddNewTodo} />
      {IsLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <TodoList items={items} onDelete={DeleteClickedTodo} />
      )}
      <Footer />
    </div>
  );
}

export default App;
