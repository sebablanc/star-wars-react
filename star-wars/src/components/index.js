import React, { useState } from 'react';
import AgregarCharacter from './agregar-character';
import EliminarCharacter from './eliminar-character';
import Home from './home';
import ObtenerCharacters from './obtener-characters';

function Index(){
  const [page, setPage] = useState('HOME');

  const changePage = (pageChanged) => {
    setPage(pageChanged);
  };

  function renderSwitch(){
    switch(page) {
      case 'HOME':
        return(  <Home changePage={changePage}/> );
      case 'AGREGAR':
        return ( <AgregarCharacter changePage={changePage}/> );
      case 'ELIMINAR':
        return ( <EliminarCharacter changePage={changePage}/> );
      case 'OBTENER':
        return (<ObtenerCharacters changePage={changePage}/>);
      default:
        return (<Index />);
    }
  }
  

  return (renderSwitch());
}

export default Index;