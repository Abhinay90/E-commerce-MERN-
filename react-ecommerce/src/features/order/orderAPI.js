export function addOrder(order) {
  console.log(order);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  console.log('fetchAllOrdersort=',pagination,sort);
  let queryString = "";
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  console.log("http://localhost:8080/order?" + queryString);

  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/order/?" + queryString);
    const data = await response.json();
    const totalOrder = response.headers.get("X-Total-Count");
    console.log(data);
    resolve({ data: { orders: data, totalOrder: +totalOrder } });
  });
}

export function updateOrder(updateData) {
  console.log(updateData);
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/order/" + updateData.id,
      {
        method: "PATCH",
        body: JSON.stringify(updateData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = response.json();
    resolve({ data });
  });
}
