import { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/users");
            if (response.data) {
                setUsers(response.data.users);
            }
        } catch (error) {
            console.log("error fetching users", error);
        }
    };
    useEffect(() => {
        getUsers();
    }, []);

    return users;
};

export default Users;
