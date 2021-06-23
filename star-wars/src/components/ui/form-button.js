import React from 'react';

class FormButton extends React.Component {

    constructor(props){
        super(props);
    }

    clicked = () =>{
        if(this.props.onClicked == null){
            return;
        }
        this.props.onClicked();
    }


    render(){
        return (
            <button id={this.props.id} className={this.props.nameClass} type={this.props.type} onClick={this.clicked}>{this.props.label}</button>
        );
    }
}

export default FormButton;