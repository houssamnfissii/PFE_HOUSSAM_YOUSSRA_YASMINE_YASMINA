import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import './Auth.css';

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleValid = async (e) => {
    // e.preventDefault();
    // const response = await fetch('http://127.0.0.1:8000/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     email, password
    //   })
    // });
    // const content = await response.json();
    // console.log(content);
    // if(content.data.token){
    //   localStorage.setItem("token", content.token);
    //   // onLogin();
    // }
    
    // // const headers = { headers: { Authorization: `Bearer ${content.token}` } };
    // // const res = await axios.get('http://127.0.0.1:8000/api/user',headers);
    // // const user = res.json();

    // if(content.data.type == "admin"){
    //   navigate('/dashboard');
    // }
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email, password
      })
    });
    const content = await response.json();
    console.log(content);
    if(content.data && content.data.token){ 
      localStorage.setItem("token", content.token);
      // onLogin();
    }
    
    const headers = { headers: { Authorization: `Bearer ${content.token}` } };
    const res = await axios.get('http://127.0.0.1:8000/api/user',headers);
    // const user = res.json();

    if(content.data && content.data.type == "admin"){ // Vérifiez si content.data est défini avant d'accéder à content.data.type
      navigate('/dashboard');
    }
    
  };

  return (
    <div className="logSection">
      <Link to="/restaurant/restaurant">restaurant</Link>
      <Link to="host">Become a Host</Link>

      <br /><br />
      <div className="logDiv">
        <h1 className="logT">Authentification</h1>
        <form onSubmit={handleValid}>
          <table>
            <tbody>
              <tr className="trL">
                <th className="thL">Email:</th>
                <td>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="username@example.com"
                    className="input"
                    required
                  />
                </td>
              </tr>
              <tr className="trL">
                <th className="thL">Password:</th>
                <td>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="input"
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="Submit" />
        </form>
        <p>ou</p>
        <span>
          <Link to={"insc"} className="insc">S'inscrire</Link>
        </span>
      </div>
    </div>
  );
}
