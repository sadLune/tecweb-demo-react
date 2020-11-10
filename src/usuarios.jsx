import React, { Component } from 'react'
import axios from 'axios'

export default class Usuarios extends Component {

    constructor(props) {
        super(props)

        this.state = { listaUsuarios: [
                {username: 'admin1'},
                {username: 'admin2'}
            ],
            usuario: {username: 'admin3'}
        };

        this.handleChange = this.handleChange.bind(this);
        this.cadastrar = this.cadastrar.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:3003/usuarios')
        .then((response) => {
            this.setState({listaUsuarios: response.data});
            console.log(response)
        })
        .catch(erro => console.log(erro))
    }

    handleChange(event) {
        this.state.usuario.username = event.target.value
        this.setState(this.state);
    }

    cadastrar() {
        axios.post('http://localhost:3003/usuarios', this.state.usuario)
        .then(response => console.log('deu certo'))
    }
    
    render() {
        var usuarios = this.state.listaUsuarios;
        var lisUsuarios = usuarios.map(function(usuario) {
            return (
                <li>{usuario.username}</li>
            )
        })
        return (
            <div>
                <ul>
                    {lisUsuarios}
                </ul>
                <ul>
                    <li>
                        <input type="text"
                            value={this.state.usuario.username}
                            onChange={this.handleChange}></input>
                    </li>
                    <li>
                        <button type="submit"
                            onClick={this.cadastrar}>Registrar</button>
                    </li>
                </ul>
            </div>
        );
    }

}