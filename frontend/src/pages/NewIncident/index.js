import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './new-incident.scss';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident () {

    //const [title, description, value] = useState([]);
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [value, setValue] = useState([]);

    const history = useHistory();

    async function handleNewIncident (e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: localStorage.getItem('ong_id')
                }
            })
            history.push('/profile');
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <Logo />
                    <h1>New Incident</h1>
                    <p>Give us all the details about the incident</p>
                    <Link to="/profile" className="link-back">
                        <FiArrowLeft class="icon-back" />
                        back
                    </Link>
                </section>
                <form>
                    <input 
                        placeholder="title" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="description" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="value"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="btn" onClick={handleNewIncident}>
                        register
                    </button>
                </form>
            </div>
        </div>        
    )
}