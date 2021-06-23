import React from 'react';

class InputForm extends React.Component {

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
            <div className="form-data">
                <label htmlFor={this.props.label.toLowerCase()}>{this.props.label}: </label>
                <input className="input" name={this.props.label.toLowerCase()} type={this.props.type} onChange={this.props.onChange}/>
            </div>
        );
    }
}

export default InputForm;