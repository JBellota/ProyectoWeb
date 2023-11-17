import React from 'react'

const AppForm = (props) => {
  return (
    <div style={{background:"orange", padding:"10px"}} >
        <form>
        <button>Cerrar aplicacion</button>

        <h2>Registrar {AppForm.js}</h2>
        <input name='nombre' type='text' placeholder='Nombres...' ></input><br/>
        <input name='edad' type='text' placeholder='Edad...' ></input><br/>

        <select>
            <option value="">Selecione género...</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
        </select><br/>


        <button>Guardar / Actualizar</button>
        </form>
    </div>
  )
}

export default AppForm
