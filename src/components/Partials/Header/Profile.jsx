import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

const Profile = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3001/users/profile", {
            credentials: "include"
        })
            .then(res => {
                if (!res.ok) throw new Error('No autenticado');
                return res.json();
            })
            .then(data => {
                if (data && data.id) {
                    setUser(data);
                }
            })
            .catch(() => {
                setUser(null);
            });
    }, [setUser]);

    const handleLogOut = async () => {
        try {
            const response = await fetch("http://localhost:3001/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                setUser(null);
                navigate("/movies");
            } else {
                console.error("Error al cerrar sesión");
            }
        } catch (error) {
            console.error("Error en logout:", error);
        }
    }

    return (
        <div className="profile">
            {user && (
                <div className="profile-login login" onClick={() => { handleLogOut() }}>
                    <i className="fa-solid fa-right-to-bracket"></i>
                </div>
            )}

            {!user ? (
                <a className="profile-login login" onClick={() => navigate('/login')}>
                    <p>Login</p>
                    <i className="fa-solid fa-user user-icon"></i>
                </a>
            ) : (
                <div className="profile-login">
                    <p>{`${user.fname} ${user.lname}`}</p>
                    <i className="fa-solid fa-user user-icon"></i>
                </div>
            )}
        </div>
    );
};

export default Profile;
