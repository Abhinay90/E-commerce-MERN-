// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders() {
  console.log();
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/order/own"
    );
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}
export function fetchLoggedInUser() {
  console.log('fetchUsers=',"http://localhost:8080/user/own");
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/user/own"
    );
    
    const data = await response.json();
    console.log("data",data)
    resolve({ data });
  });
}

export function updateUser(updateUserData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/user/" + updateUserData.id,
      {
        method: "PATCH",
        body: JSON.stringify(updateUserData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}
