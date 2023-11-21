import React, { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../conexion/firebase";

const AppForm = (props) => {

  const handleStatusChange = (e) =>{
    const {name, value} = e.target;
    setObjeto({...objeto, [name]:value});
    //console.log({name, value});
    console.log(objeto);
  }

  const camposRegistro = {nombre:"",edad:"",genero:""};
  const [objeto, setObjeto] = useState(camposRegistro);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (props.idActual =="" ){
        if(validarform()){
          addDoc(collection(db, 'basedatos'), objeto);
          alert("Se registro con éxito...");
        }else{
          console.log("No se guardo...");
        }
      }else{
        alert("Se actualizo el Registro...");
      }
    } catch (error) {
      console.log("Error en Crear o Actualizar",error);    
    }
  }

  const validarform =() => {
    if(objeto.nombre === "" || /^\s+$/.test(objeto.nombre)){
      alert("Escriba nombre...");
      return false;
    }
    return true;
  };

  useEffect(() =>{
    if(props.idActual === ""){
      setObjeto({...camposRegistro});
    }else{
      obtenerDatosPorId(props.idActual);
    }
  },[props.idActual]);

  const obtenerDatosPorId = async (xId) =>{
    const objPorId = doc(db, "basedatos", xId);
    const docPorId = await getDoc(objPorId);
    if(docPorId.exists()){
      setObjeto(docPorId.data());
    }else{
      console.log("No hay doc");
    }
  }

  return (
    <div style={{background:"orange", padding:"10px"}} >
        <form onSubmit={handleSubmit} >
        <button>Cerrar aplicacion</button>

        <h2>Registrar (AppForm.js)</h2>
        
        <input onChange={handleStatusChange} value={objeto.nombre} name='nombre' type='text' placeholder='Nombres...' ></input><br/>
        <input onChange={handleStatusChange} value={objeto.edad} name='edad' type='text' placeholder='Edad...' ></input><br/>

        <select onChange={handleStatusChange} value={objeto.genero} name='genero' >
            <option value="">Selecione género...</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
        </select><br/>


        <button>
          {props.idActual=="" ? "Guardar": "Actualizar"}
        </button>
        </form>
    </div>
  )
}

export default AppForm;
