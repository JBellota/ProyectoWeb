import React, { useEffect, useState } from 'react'
import App from '../App'
import AppForm from './AppForm'
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../conexion/firebase';

const AppLista = (props) => {
  const [docBD, setDocBD] = useState([]);
  const fnRead = () =>{
    const xColeccionConQuey = query(collection(db, 'basedatos'));
    const unsubcribe = onSnapshot(xColeccionConQuey, (xDatosBD)=>{
      const xDoc = [];
      xDatosBD.forEach((doc) => {
        xDoc.push({id:doc.id, ...doc.data()});
      });
      setDocBD(xDoc);
    });
  }
  useEffect(() =>{fnRead();}, [props.idActual]);
  //console.log(docBD);

  const [idActual, setIdActual] = useState("");
  const fnDelete = async (xId) =>{
    if (window.confirm("Confirme para eliminar")){
      await deleteDoc(doc(db, "basedatos", xId));
    }
    alert("Se elimino con éxito...");
  }

  return (
    <div style={{background:"greenyellow", padding:"10px"}}>
      <h1>App.js</h1>
      <AppForm {...{idActual, setIdActual}} />

      <h1>Lista de Clientes</h1>
      {
        docBD.map((row, index) => 
        <p key={row.id}>
          No.{index + 1}. {row.nombre} 
          .....
          <span onClick={()=> fnDelete(row.id)} >x</span> 
          .....
          <span onClick={()=> setIdActual(row.id)} >A</span>
          A 
          </p> 
          )
      }
      
    </div>
  )
}

export default AppLista;
