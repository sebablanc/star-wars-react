import React from 'react';

function CharactersCard({character}){
    const img = '../../assets/Darth_Vader.jpg';
    return(
        <div className="character-cards-container" > 
            <div className="character-card">
                <img className="card-character-img" src={process.env.PUBLIC_URL + '/imgs/'+character.toLowerCase()+'.png'} />
                <div className="card-character-info">{character}</div>
            </div>
        </div>
    );
}

export default CharactersCard;