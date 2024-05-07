import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import axios from 'axios';

export default function Pages(){
    const { userType, setUserType } = useContext(UserContext);
    useEffect(() => {
        axios.get('/api/user')
          .then(response => {
            setUserType(response.data.type);
          })
          .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération des données utilisateur:', error);
          });
      }, [setUserType]);

    if (userType === 'admin') {
        return <Link to="/admin" />;
    } else if (userType === 'host') {
        return <Link to="/host" />;
    } else {
        return <Link to="/client" />;
    }
};
