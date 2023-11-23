import React, { useState } from 'react';
import { useAuth } from '../ruteo/AuthContext'; // (7). Importando contexto
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  
  const { signIn, user, } = useAuth();                 // (7). Usando el contexto

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, completa ambos campos.');
      return;
    }

    try {
      await signIn(email, password);
      // Inicio de sesión exitoso: limpiar el error
      setError(null);
      navigate('/sistema-crud'); // Redirigir a ruta /sistema-crud
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  }

  return (

<form onSubmit={handleSignIn} >
  <div class="form-group row">
    <label for="exampleInputEmail1">Iniciar Sesion:</label>
    <input type="email" class="col-sm-2 col-form-label" id="exampleInputEmail1" aria-describedby="emailHelp" input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
    <small id="emailHelp" class="form-text text-muted">Nunca compartiremos tu correo electrónico con nadie más.</small>
  </div>
  <div class="form-group row">
    <label for="exampleInputPassword1">Contraseña</label>
    <input type="password" class="col-sm-2 col-form-label" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Recordar</label>
  </div>
  <button type="submit" class="btn btn-primary">Iniciar Sesion</button>
</form>

  );
}

export default LoginForm;


/*<div id='public'>
      <h2>Iniciar Sesión YES</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>*/