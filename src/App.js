import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState,useEffect} from "react";
import Additem from "./Additem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const API_URL='http://localhost:3000/lists';
  const [items, setitems] = useState([]);

  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('')
  const [fetchError, setfetchError] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const fetchItem=async()=>{
      try {
        const response=await fetch(API_URL);
        if(!response.ok) throw Error("Data not received");
        const listItem=await response.json();
        console.log(listItem);
        setitems(listItem); 
        setfetchError(null);
        
      } catch (err) {
        setfetchError(err.message);
        
      }finally{
        setisLoading(false);

      }
    }
    setTimeout(() => {
      (async()=>await fetchItem())();

    }, 2000);
  }, [])
  

  const handleCheck = async(id) => {
    const listItem = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setitems(listItem);
    const myItem=listItem.filter((item)=> item.id===id)
    
    const updateOption={
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({checked:myItem[0].checked})

    }
    const reqUrl=`${API_URL}/${id}`
    const result=await apiRequest(reqUrl,updateOption)
    if(result) setfetchError(result)
  };
  const handleDelete = async (id) => {
    const listItem = items.filter((item) => item.id !== id);
    setitems(listItem);
    const deleteOption = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOption);
    if (result) setfetchError(result);



  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem) return;
    console.log('New item:', newItem);
    addItem(newItem);
    setNewItem('');
  };
  const addItem=async (item)=>{
    const maxId = items.length ? Math.max(...items.map(item => Number(item.id))) : 0;
    const id = maxId + 1;
    const newItemObj = { id: id.toString(), checked: false, item };
    const listItem = [...items, newItemObj];
    setitems(listItem); 
    
    const postOption={
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(newItemObj)

    }
    const result=await apiRequest(API_URL,postOption)
    if(result) setfetchError(result)

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
      <main>
      {isLoading && <p>Loading items..</p>}
      {fetchError && <p>{`ERROR: ${fetchError}`}</p>}
      {!isLoading && !fetchError &&<Content
        items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      }
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
