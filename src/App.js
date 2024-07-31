import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState } from "react";
import Additem from "./Additem";
import SearchItem from "./SearchItem";

function App() {
  const [items, setitems] = useState(JSON.parse(localStorage.getItem('todo_list')));

  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('')

  const handleCheck = (id) => {
    const listItem = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setitems(listItem);
    localStorage.setItem("Todo_list", JSON.stringify(listItem));
  };
  const handleDelete = (id) => {
    const listItem = items.filter((item) => item.id !== id);
    setitems(listItem);
    localStorage.setItem("Todo_list", JSON.stringify(listItem));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem) return;
    console.log('New item:', newItem);
    addItem(newItem);
    setNewItem('');
  };
  const addItem=(item)=>{
const id=items.length?items[items.length-1].id+1:1;
    const addNewItem={id,checked:false,item}
    const listItem=[...items,addNewItem];
    setitems(listItem);
    localStorage.setItem("todo_list",JSON.stringify(listItem));
  

  }

  return (
    <div className="App">
      <Header title="To do List" />
      <Additem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content
        items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
