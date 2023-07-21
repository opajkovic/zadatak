const fetchItems = async () => {
    let res = await fetch('https://dummyjson.com/products')
    return res.json()
  }

const deleteItem = async () => {
  let res = await fetch('https://dummyjson.com/products/id', {
    method: "DELETE",
  })
    return  res.json();
}
 const addItem = async (item) => {
  let res = await  fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  })
   return res.json()
 }

 const editItem = async (id) => {
  let res = await fetch('https://dummyjson.com/products/id', {
    method: 'PUT', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'iPhone Galaxy +1'
    })
  })
  return res.json();
 }

export  {fetchItems, deleteItem, addItem, editItem};