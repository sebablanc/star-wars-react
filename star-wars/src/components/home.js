import React from 'react';
import logo from '../assets/Star_Wars_logo.png';
import HomeBigButton from './home-big-button';

function Home({changePage}){

  return (
    <div className="App">
      <h1 className="welcome-title">Bienvenido a tu base de datos de personajes</h1>
      <img className="img-logo" src={logo}/>
    
      <div className="botonera-home">
        <HomeBigButton label="Agregar personaje" ownClass="first-button" value="AGREGAR" callback={changePage}/>
        <HomeBigButton label="Eliminar personaje" ownClass="second-button" value="ELIMINAR" callback={changePage}/>
        <HomeBigButton label="Obtener personajes" ownClass="third-button" value="OBTENER" callback={changePage}/>
      </div>
    </div>
    );
}

export default Home;