import React, { useState, useEffect } from 'react';
import darthVaderCrack from '../assets/Darth_Vader.jpg';
import SelectForm from './ui/select-form';
import FormButton from './ui/form-button';

function EliminarCharacter({changePage}){
    const [episodios, setEpisodios] = useState([]);
    const [personajes, setPersonajes] = useState([]);
    const [episodio, setEpisodio] = useState();
    const [personaje, setPersonaje] = useState('');
    
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

    const handleSubmit = (event) => {
        event.preventDefault();
        submitData();
    }

    async function submitData() {
        if(episodio === '' || personaje === '') return;

        try {
            const response = await fetch('http://localhost:8000/deleteCharacter', {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    episode: episodio,
                    character: personaje
                })
            });
            const data = await response.json();
            findCharacters(episodio);
            alert(data.message);
        } catch (err) {
            console.log(err);
        }
    }
    return(
        <div>
            <h1 className="welcome-title">No subestimes el poder de la fuerza</h1>
            <img className="character-float" src={darthVaderCrack} />

            <form id="addForm" className="agregar-character-form" onSubmit={(e)=> handleSubmit(e)} >
                <SelectForm label="Episodio" list={episodios} callback={(event) => {setEpisodio(event.target.value); findCharacters(event.target.value)}}></SelectForm>
                <SelectForm label="Personaje" list={personajes} callback={(event) => setPersonaje(event.target.value)}></SelectForm>
                
                <FormButton id="cancelButton" nameClass="back-button" type="button" label="Volver" onClicked={() => changePage('HOME')} />
                <FormButton id="submitButton" nameClass="submit-button delete-button" type="submit" label="Eliminar"/>
            </form>
        </div>
    );
}

export default EliminarCharacter;