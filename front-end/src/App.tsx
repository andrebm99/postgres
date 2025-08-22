import { useState , useEffect } from 'react';

function App() {
  const [merchants, setMerchants] = useState(" ");

  function getMerchants(){
    fetch(`http://localhost:3000`)
      .then(response => {
        return response.text();
      })
      .then(data => {
        setMerchants(data); 
      });
    }

  function createMerchant(){
    let name = prompt("Ingrese nombre de comerciante: ");
    let email = prompt("Ingrese email de comerciante: ");

    fetch(`http://localhost:3000/merchants`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email}),
    })
    .then(response => {
      return response.text();
    })
    .then(data => {
      alert(data);
      getMerchants();
    });
  }

  function deleteMerchant(){
    let id = prompt("Ingrese el id: ");
    fetch(`http://localhost:3000/merchants/${id}`,{
      method: "DELETE",
    })
    .then(response => {
      return response.text();
    })
    .then(data => {
      alert(data);
      getMerchants();
    });
  }

  function updateMerchant(){
    let id = prompt("Ingrese id:");
    let name = prompt("Ingrese nombre nuevo: ");
    let email = prompt("Ingrese correo nuevo: ");

    fetch(`http://localhost:3000/merchants/${id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email}),
    })
    .then(response => {
      return response.text();
    })
    .then(data => {
      alert(data);
      getMerchants();
    });
  }
  
  useEffect(() => {
    getMerchants();
  }, []);

  return(
    <div>
      {merchants ? merchants : 'No hay datos disponibles '}
      <br />
      <button onClick={createMerchant}>Add merchant</button>
      <br />
      <button onClick={deleteMerchant}>Delete merchant</button>
      <br />
      <button onClick={updateMerchant}>Update merchant</button>
    </div>
  );

}

export default App;
