import React, {useState} from 'react';
import './login.scss';
import heroes from '../../assets/heroes.png'; // do this with SVG later when there is access to the file
// React awesomeness - import SVG as component
import { ReactComponent as Logo } from '../../assets/logo.svg';
import {FiLogIn, FiUserPlus} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function Login () {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin (e) {
        e.preventDefault();

        try {
            const response = await api.post('session', {id});
            // store the data - not very secure?
            localStorage.setItem('ong_id', response.data.id);
            localStorage.setItem('ong_name', response.data.name);
            history.push('/profile');
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div className="login-container">
            <section className="form-section">
                <Logo />                
                <form>
                    <h1>Login</h1>
                    <input 
                        placeholder="your ONG id"
                        value={id}
                        onChange={e=>setId(e.target.value)}
                    />
                    <button type="submit" className="btn" onClick={handleLogin}>
                        GO <FiLogIn color="#fff" className="icon" />
                    </button>
                    {/* use Link..? */}
                    <Link to="/register">
                        <FiUserPlus className="icon" />
                        register
                    </Link>
                </form>
            </section>    
            <img src={heroes} alt="Be the Hero" />
        </div>
    )    
}
