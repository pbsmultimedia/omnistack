import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './register.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { FiArrowLeft, FiUserPlus } from 'react-icons/fi';
import api from '../../services/api';

// this could be a pure component?
export default function Register () {

    // const [value, function] = = useState(initial value);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');

    const history = useHistory();

    async function handleRegister (e) {        
        // how to debug react on VSc? - install the VSc chrome debugger tool

        e.preventDefault();
        const data = {
            name,
            email,
            city,
            whatsapp
        };
        
        try {
            const response = await api.post('ongs', data);
            alert(`ID: ${response.data.id}`);
            history.push('/');
        } catch (e) {
            alert(e);
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <Logo />
                    <h1>Register</h1>
                    <p>
                        Help others and Be the Hero!    
                    </p>
                    <Link to="/" className="link-back">
                        <FiArrowLeft className="icon icon-back" />
                        back
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="ONG"
                        value={name}
                        onChange={e=>{setName(e.target.value)}}
                    />
                    <input 
                        placeholder="email" 
                        value={email}
                        onChange={e=>{setEmail(e.target.value)}}
                    />
                    <input 
                        placeholder="whatsapp"
                        value={whatsapp}
                        onChange={e=>{setWhatsapp(e.target.value)}}
                    />
                    <input 
                        placeholder="city"
                        value={city}
                        onChange={e=>{setCity(e.target.value)}}
                    />

                    <button className="btn">
                        Register <FiUserPlus color="#fff" className="icon icon-register" />
                    </button>
                </form>
            </div>
        </div>
    )
}