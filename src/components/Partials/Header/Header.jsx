import React from "react";
import Nav from "./Nav";
import Profile from "./Profile";
import Logo from "./Logo";

const Header = () => {
    return (
        <header className="header" id="header">
            <div className="container">
                <Logo />
                <Nav />
                <Profile />
            </div>
        </header>
    );
}
export default Header;
