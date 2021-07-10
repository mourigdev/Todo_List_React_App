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
    
  };

  useEffect(Affichage, []);

  const DeleteClickedTodo = (id) => {
    console.log(id);
    setItems(
      previousItems=>{
        const updateItems = previousItems.filter( item=> item.id !== id )

        return updateItems;
  }
  )
    fetch(`https://todos-af6ae-default-rtdb.firebaseio.com/todos/${id}.json`, {
      method: "DELETE",
    })
    // .then((response) => {
    //     console.log(response.status)
    //     // if (response.status === 200) {
    //       console.log("yes")
    //     //   setItems(
    //     //     previousItems=>{
    //     //       const updateItems = previousItems.filter( item=> item.id !== id )

    //     //       return updateItems;
    //     // }
    //     // )
    //     // }
    //     // return response.json();
    //   })
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
        done : false
      }),
    }).then((response) => {
      console.log(response)
      Affichage()
      // if(response.status === 200){
      //   setItems((previousItems) => {
      //     const updatedData = [...previousItems];
      //     updatedData.unshift({
            
      //       bodyText: TodoText,
      //     });
      //     return updatedData;
      //   });
      // }

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


  const onDoneEdit = (id,status) =>{
    console.log(status)
    console.log(id)
    if(status !== true){
      fetch(`https://todos-af6ae-default-rtdb.firebaseio.com/todos/${id}/done.json`, {
      method: "PUT",
      body: true,
    })
      // .then((response) => {
        // console.log(response)
        // console.log(response.status)
        // if (response.status === 200) {
          console.log("yes")
          setItems(
            previousItems=>{
              const updateItems = []
              console.log(previousItems)
              previousItems.forEach(element=>{
                
                if (element.id === id) {
                  console.log(element)
                  element.done = true
                  updateItems.push(element)
                }else{
                  updateItems.push(element)
                }
              })
              console.log(updateItems)
              return updateItems;
        }
        )
        // }
        // return response.json();
      // })
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
    }else{
      console.log('Nooo')

      fetch(`https://todos-af6ae-default-rtdb.firebaseio.com/todos/${id}/done.json`, {
      method: "PUT",
      body: false,
    })
      // .then((response) => {
        // console.log(response)
        // console.log(response.status)
        // if (response.status === 200) {
          console.log("yes")
          setItems(
            previousItems=>{
              const updateItems = []
              previousItems.forEach( item=>{
                if (item.id !== id) {
                  updateItems.push(item)
                }else{
                  updateItems.push({
                    id : id,
                    bodyText : item.bodyText
                  })
                }
              })
              return updateItems;
        }
        )
        // }
        // return response.json();
      // })
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

    }


  }

  return (
    <div>
      <InputAddTodo onAddNewTodod={AddNewTodo} />
      {IsLoading ? (
        <div className="loadingContainer">
          <p>Loading...</p>
        </div>
      ) : (
        <TodoList items={items} onDelete={DeleteClickedTodo} onDoneEdit={onDoneEdit} />
      )}
      <Footer />
    </div>
  );
}

export default App;
