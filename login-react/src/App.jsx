import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from "axios";

function App() {

  const [datos,setDatos] = useState({
    usuario:"",
    clave:""
  });

  const handleInputChange = (e) => {
    let {name,value} = e.target;
    let newDatos = {...datos, [name]:value};
    setDatos(newDatos);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!e.target.checkValidity()){
      console.log("no enviar");
    }else{
      let res = await axios.post("http://localhost:3001/usuario/login",datos);
      console.log(res.data);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name='usuario'
                value={datos.usuario}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name='clave'
                value={datos.clave}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
