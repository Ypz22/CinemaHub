import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();
    return (
        <a onClick={() => { navigate('/movies') }}>
            <div className="logo" id="logo">
                CinemaHub
            </div>
        </a>
    );
}
export default Logo;
