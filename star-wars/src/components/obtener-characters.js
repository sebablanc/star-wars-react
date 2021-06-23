import React, { useState, useEffect } from 'react';
import hiC3PO from '../assets/hi-c3po.png';
import SelectForm from './ui/select-form';
import FormButton from './ui/form-button';
import CharactersCards from './character-cards';

function ObtenerCharacters({changePage}){
    const [episodios, setEpisodios] = useState([]);
    const [personajes, setPersonajes] = useState([]);
    const [episodio, setEpisodio] = useState();
    
    useEffect(async () => {
        try {
            const response = await fetch('http://localhost:8000/getEpisodes', {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if(data.reply){
                setEpisodios(data.reply);
            } else {
                return data.message;
            }
        } catch (err) {
            console.log(err);
        }
    },[]);

    const findCharacters = async (episode) => {
        try {
            if(!episode){
                setPersonajes([]);
                return;
            }

            const response = await fetch(`http://localhost:8000/getCharactersByEpisode?episode=${episode}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            if(data.reply){
                setPersonajes(data.reply);
            } else {
                return data.message;
            }
        } catch (err) {
            console.log(err);
        }
    }
    return(
        <div>
             <h1 className="welcome-title">
                <div>A veces no comprendo el comportamiento humano.</div>
                <div>Sólo intento hacer mi trabajo de la forma mas eficiente.</div>
            </h1>
            <img className="character-float" src={hiC3PO} />

            <form id="addForm" className="agregar-character-form" >
                <SelectForm label="Episodio" list={episodios} callback={(event) => {setEpisodio(event.target.value); findCharacters(event.target.value)}}></SelectForm>
                
                <FormButton id="cancelButton" nameClass="back-button" type="button" label="Volver" onClicked={() => changePage('HOME')} />

                <CharactersCards list={personajes} />
            </form>
        </div>
    );
}

export default ObtenerCharacters;