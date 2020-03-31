import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import {FiPower, FiTrash, FiAlertCircle} from 'react-icons/fi';
import './profile.scss';
import api from '../../services/api';

export default function Profile () {

    const[incidents, setIncidents] = useState([]); // will store the response from the server

    const history = useHistory();

    let ong_id = localStorage.getItem('ong_id');

    // similar to componentDidUpdate
    // but if we stored the result on state, updating the layout was automatic....
    useEffect(()=>{
        api.get('profile', {
            headers: {
                Authorization: ong_id
            }
        }).then(r => {
            setIncidents(r.data);
        })
    },[ong_id])

    async function handleDelete (id) {

        if (window.confirm('confirm?')) {
            try {
                await api.delete(`incidents/${id}`, {
                    headers: {
                        Authorization: ong_id
                    }
                })

                // remove this incident
                setIncidents(incidents.filter(incident => incident.id !== id));

            } catch (e) {
                alert(e);
            }
        }
    }

    function handleLogout () {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <Link to="/">
                    <Logo alt="Be the Hero"/>
                </Link>
                <span>
                    Welcome {localStorage.getItem('ong_name')}
                </span>
                <div className="btn-group">
                    <Link to="/incidents/new" className="btn btn-new-incident">
                        New incident
                    </Link>
                    <button className="btn-logout" onClick={handleLogout}>
                        <FiPower />
                    </button>
                </div>
            </header>

            <h1>Incidents</h1>

            {/* should be a component? like incident card */}
            <ul className="incidents-list">
                {incidents.map(incident =>(
                    <li key={incident.id}>
                        <h2>
                            <FiAlertCircle /> incident <span>#{incident.id}</span>
                        </h2>
                        <p>
                            {incident.title}
                        </p>
                        <strong>
                            description
                        </strong>
                        <p>
                            {incident.description}
                        </p>
                        <strong>
                            value
                        </strong>
                        <p>
                            {/* native stuff! */}
                            {Intl.NumberFormat('en-EN', {style: 'currency', currency: 'EUR'}).format(incident.value)}
                        </p>

                        <button className="btn-delete" onClick={()=>handleDelete(incident.id)}>
                            <FiTrash />
                        </button>
                    </li>
                ))}                
            </ul>

        </div>
    )    
}