export function createUser(userData) {
  return new Promise(async (resolve) => {
    console.log(userData);
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
      if (response.ok){
        const data = await response.json();
        resolve({ data });
      } 
      else{
        const data = await response.text();
        reject(data);
      }         
    } catch (error) {
      reject(error);
    }
  });
}



export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/auth/check');
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}



export function deleteUser(userId) {
  console.log("http://localhost:8080/users/" + userId);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/" + userId, {
      method: "DELETE",
    });
    const data = await response.json();
    resolve({ data: "success" });
  });
}
