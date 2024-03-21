// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // to do hard code in flexible
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function addProduct(product) {
  return new Promise(async (resolve) => {
    // to do hard code in flexible
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  console.log(update);
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    // to do hard code in flexible

    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchFilterProducts(filter, sort, pagination,admin) {
  let queryString = "";
  for (let key in filter) {
    let categoryValue = filter[key];
    if (categoryValue.length) {
      const lastValue = categoryValue[categoryValue.length - 1];
      queryString += `${key}=${lastValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
    
  console.log(admin)
   if(admin){
       queryString+=`admin=${true}`;
       console.log(queryString)
   }

  // queryString= http://localhost:8080/order?_page=1&_limit=2

  return new Promise(async (resolve) => {
    // to do hard code
    const response = await fetch(
      `http://localhost:8080/products?${queryString}`
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    console.log();
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    // to do hard code in flexible
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllCategoreis() {
  return new Promise(async (resolve) => {
    // to do hard code in flexible
    const response = await fetch("http://localhost:8080/categoreis");
    const data = await response.json();
    resolve({ data });
  });
}
