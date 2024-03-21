export function addToCart(item) {
  
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
     
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemsByUser() {
  // http://localhost:8080/cart?users=1
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart");
    
    const items = await response.json();
  
    resolve({ items });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {"content-type":"application/json"}
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteToCart(itemId) {
  console.log(itemId);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: {"content-type":"application/json"}
    });
    const data = await response.json();
    resolve({ data:{id:itemId} });
  });
}

export function resetCart() {
  return new Promise(async (resolve) => {
    const response=await fetchItemsByUser()
    const items = response.items;
    console.log(response);
    for(let item of items){
      await deleteToCart(item.id)
    }
    resolve({ status:'success' });
  });
}
