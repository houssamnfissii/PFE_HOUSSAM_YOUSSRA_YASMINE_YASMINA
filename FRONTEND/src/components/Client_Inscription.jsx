import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import './Inscr.css';
function Client_Inscription() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('')


    const navigate = useNavigate();
    const handleAddUser = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name, password, email, type
            })
        });
        const content = await response.json();
        console.log(content);
        navigate('/');
    }


    return (
        <div className="signContainer">
            <div className="TsignDiv">
                <h1 className="SignTitle">Formulaire d'inscription</h1>
                <form onSubmit={handleAddUser}>
                    <table className="Tsign">
                        <tbody>
                            <tr className="trS">
                                <th className="thS">Nom</th>
                                <td>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Nom"
                                        className="input"
                                    />
                                </td>
                                <th className="thS">Type</th>
                                <td>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="input"
                                    >
                                        <option value="client">Client</option>
                                        <option value="host">Host</option>
                                    </select>
                                </td>

                            </tr>

                            <tr className="trS">
                                <th className="thS">Email</th>
                                <td>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="login"
                                        className="input"
                                    />
                                </td>
                            </tr>
                            <tr className="trS">

                            </tr>

                            <tr className="trS">
                                <th className="thS">Mot de passe</th>
                                <td>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="mot de passe"
                                        className="input"
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <hr />
                    <div className="btnDiv">
                        <button type="submit" className="valS">Valider</button>
                        <p className="ou">ou</p>
                    </div>
                </form>
                <br />
                <Link to="/" id="lin">Login</Link>
            </div>
        </div>
    );
}

export default Client_Inscription;
