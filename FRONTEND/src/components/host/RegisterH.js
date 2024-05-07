import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


// import './Inscr.css';
function RegisterH() {

const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const[CIN,setCIN]=useState('');
const[first_name,setFirstName]=useState('')
const[last_name,setLastName]=useState('')
const[birth_date,setBirthDate]=useState('')
const[address,setAddress]=useState('')
const[company_name,setCompanyName]=useState()
const[telephone,setTelephone]=useState('')
const[name,setName]=useState('')




  const navigate = useNavigate();
  const handleAddUser = async (e) => {
    e.preventDefault();
    const response=await fetch('http://127.0.0.1:8000/api/host/registerH',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
            first_name,last_name,name,password,email,CIN,address,birth_date,company_name,telephone
      })
    });
    const content=await response.json();
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
                </td></tr>
              <tr className="trS">
                <th className="thS">Nom</th>
                <td>
                  <input
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder="Nom"
                    className="input"
                  />
                </td>
                
                <th className="thS">Nom</th>
                <td>
                  <input
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder="Nom"
                    className="input"
                  />
                </td>
              
              </tr>
         
              <tr className="trS">
                <th className="thS">Birth date</th>
                <td>
                  <input
                    type="date"
                    value={birth_date}
                    onChange={(e) =>setBirthDate(e.target.value)}
                    required
                    placeholder="birth date"
                    className="input"
                  />
                </td>
              </tr>
             

              <tr className="trS">
                <th className="thS">Email</th>
                <td>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                    required
                    placeholder="login"
                    className="input"
                  />
                </td>
              </tr>
              <tr className="trS">
                <th className="thS">CIN</th>
                <td>
                  <input
                    type="text"
                    value={CIN}
                    onChange={(e) =>setCIN(e.target.value)}
                    required
                    placeholder="Enter your CIN"
                    className="input"
                  />
                </td>
              </tr>
              <tr className="trS">

            </tr>
            
            <tr className="trS">
                <th className="thS">Adress</th>
                <td>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) =>setAddress(e.target.value)}
                    required
                    placeholder="Adress"
                    className="input"
                  />
                </td>
              </tr>
              <tr className="trS">
                <th className="thS">company name</th>
                <td>
                  <input
                    type="text"
                    value={company_name}
                    onChange={(e) =>setCompanyName(e.target.value)}
                    required
                    placeholder="company name"
                    className="input"
                  />
                </td>
              </tr>
              <tr className="trS">
                <th className="thS">Telephone</th>
                <td>
                  <input
                    type="text"
                    value={telephone}
                    onChange={(e) =>setTelephone(e.target.value)}
                    required
                    placeholder="telephone"
                    className="input"
                  />
                </td>
              </tr>

              
             
             






              <tr className="trS">
                <th className="thS">Mot de passe</th>
                <td>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>setPassword(e.target.value)}
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

export default RegisterH;
