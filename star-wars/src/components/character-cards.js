import React from 'react';
import CharactersCard from './ui/character-card';

function CharactersCards({list}){
    return(
        <div className="obtener-characters-cards-container" >
           {list.map((item, index) => {return <CharactersCard character={item} />})}
        </div>
    );
}

export default CharactersCards;