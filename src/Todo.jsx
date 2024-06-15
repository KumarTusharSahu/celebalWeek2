import React, { useEffect, useState } from 'react'
import todo from "./images/todo.png"

//to get data from local storage
const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  console.log(list);

  if (list) {
    return JSON.parse(list);
  }
  else {
    return [];
  }
}

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("Enter a valid text");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData }
          }
          return elem;
        })
      )
      setToggleSubmit(true);

      setInputData("");

      setIsEditItem(null);
    }
    else {
      const allInputData = { id: new Date().getTime().toString(), name: inputData }
      setItems([...items, allInputData]);
      setInputData("");
    }
  }

  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    })
    setItems(updatedItems);
  }

  //edit the item
  // when user click on the edit button

  // 1: get the id and name of the data which user clicked to edit
  // 2: set the toggle mode to change the submit button to edit button
  // 3: Now update the value of the setInput with the new updated value to edit
  // 4: To pass the current element  id to new state variable for reference


  const editItem = (Id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === Id
    });
    console.log(newEditItem);

    setToggleSubmit(false);

    setInputData(newEditItem.name);

    setIsEditItem(Id);
  }

  const removeAll = () => {
    setItems([]);
  }

  //add data to local storage

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items))
  }, [items]);

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src={todo} alt="todo logo" />
            <figcaption>Add your list here ✌</figcaption>
          </figure>

          <div className='addItems'>
            <input type='text' placeholder='✍Add Items...'
              value={inputData}
              onChange={(e) => {
                setInputData(e.target.value);
              }} />
            {
              toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>
                : <i className="far fa-edit add-btn" title="Update Item" onClick={addItem} ></i>
            }

          </div>
          <div className="showItems">
            {
              items.map((elem) => {
                return (
                  <div className='eachItem' key={elem.id}>
                    <h3>{elem.name}</h3>
                    <div className="todo-btn">
                      <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                      <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                    </div>
                  </div>
                )
              })
            }

          </div>
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> CHECK LIST </span> </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo
