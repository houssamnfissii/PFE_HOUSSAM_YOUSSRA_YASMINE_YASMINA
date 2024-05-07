import { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [formDisplay, setFormDisplay] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [filterRole, setFilterRole] = useState('');
    const [error_msg_email,setError_msg_email] = useState("");
    const [error_msg_password,setError_msg_password] = useState("");

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/users");
            if (response.data) {
                setAllUsers(response.data.users); 
                setUsers(response.data.users); 
            }
        } catch (error) {
            console.log("error fetching users", error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        const filteredUsers = allUsers.filter(user => filterRole === '' || user.type === filterRole);
        setUsers(filteredUsers);
    }, [allUsers, filterRole]);

    const handleSelectedRows = (e) => {
        const userId = parseInt(e.target.value);
        if (e.target.checked) {
            setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
        } else {
            setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter((id) => id !== userId));
        }
    };

    const handleCheckboxSelection = async () => {
        console.log(selectedUsers);
        try {
            await axios.delete("http://localhost:8000/api/users", {
                data: {IdOfusersToDelete: selectedUsers}
            });
            getUsers();
        } catch (error) {
            console.log("error deleting users", error);
        }
    };

    const toggleStatus = async (userId, userStatus) => {
        let newStatus = userStatus === 0 ? 1 : 0;
        try {
            await axios.put(`http://localhost:8000/api/users/${userId}`, {
                status: newStatus,
            });
            setAllUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, status: newStatus } : user
                )
            );
            console.log(users);
        } catch (error) {
            console.log("error toggling user status", error);
        }
    };

    const AddUser = async () => {
        setFormDisplay(!formDisplay);
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError_msg_email("Invalid email format");
        return;
    }
    
    if (password.length < 8) {
        setError_msg_password("Password must be at least 8 characters long");
        return;
    }
        try {
            await axios.post(`http://localhost:8000/api/users`, {
                email: email,
                password: password
            });
            getUsers();
            setFormDisplay(false);
            setEmail("");
            setPassword("");
            console.log(users);
        } catch (error) {
            console.log("error adding user", error);
        }
    }

    const handleFilter = (e) => {
        setFilterRole(e.target.value);
    }

    return (
        <div>
            <button onClick={handleCheckboxSelection}>Delete</button>

            <button onClick={AddUser}>Add Admin User</button>


            <div className="bg-red-500 p-4" style={{ "display": formDisplay ? "block" : "none" }} >
                <form onSubmit={handleSubmit} >
                    <label>Email</label>
                    <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                    {error_msg_email &&  <p style={{color: "red"}}>{error_msg_email}</p>}
                    <label>Password</label>
                    <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                    {error_msg_password &&  <p style={{color: "red"}}>{error_msg_password}</p>}
                    <input type="submit" value="Add" />
                </form>
            </div>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Téléphone</th>
                        <th>
                            <select value={filterRole} onChange={handleFilter}>
                                <option value="">All</option>
                                <option value="client">Client</option>
                                <option value="host">Host</option>
                                <option value="admin">Admin</option>
                            </select>
                        </th>

                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    value={user.id}
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={handleSelectedRows}
                                />
                            </td>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.type}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => toggleStatus(user.id, user.status)}>
                                    {user.type !== "host" ?
                                        (user.status === 0 ? "Block" : "Unblock") :
                                        (user.status === 1 ? "Validate" : "Unvalidate")
                                    }
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
