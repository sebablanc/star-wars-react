import React, { useState } from 'react';
import yodaThinking from '../assets/yoda-thinking.webp';
import FormButton from './ui/form-button';
import InputForm from './ui/input-form';

function AgregarCharacter({changePage}){
    const [episodio, setEpisodio] = useState('');
    const [personaje, setPersonaje] = useState('');

    async function submitData() {
        if(episodio === '' || personaje === '') return;

        try {
            const response = await fetch('http://localhost:8000/saveCharacter', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    episode: 'episodio_'+episodio,
                    character: personaje
                })
            });
            const data = await response.json();
            alert(data.message);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        submitData();
    }

    return (
        <div>
            <h1 className="welcome-title">¿Agregar un nuevo personaje es lo que deseas, joven padawan?</h1>
            <img className="character-float" src={yodaThinking} />
        
            <form id="addForm" className="agregar-character-form" onSubmit={(e)=> handleSubmit(e)} >
                
                <InputForm label="Episodio" type="number" onChange={(event) => setEpisodio(event.target.value)} />

                <InputForm label="Personaje" type="text" onChange={(event) => setPersonaje(event.target.value)} />
                
                <FormButton id="cancelButton" nameClass="back-button" type="button" label="Volver" onClicked={() => changePage('HOME')} />
                <FormButton id="submitButton" nameClass="submit-button save-button" type="submit" label="Guardar"/>
            </form>
        </div>
    );
}

export default AgregarCharacter;