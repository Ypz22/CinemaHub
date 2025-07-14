import React, { useEffect } from "react";
import './../../../public/login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const Login = () => {

    const [fname, setFName] = React.useState("");
    const [lname, setLName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container-login');

        const handleSignUp = () => container.classList.add("right-panel-active-login");
        const handleSignIn = () => container.classList.remove("right-panel-active-login");

        signUpButton.addEventListener('click', handleSignUp);
        signInButton.addEventListener('click', handleSignIn);

        return () => {
            signUpButton.removeEventListener('click', handleSignUp);
            signInButton.removeEventListener('click', handleSignIn);
        };
    }, []);
    const saveUser = (e) => {
        e.preventDefault();

        if (!fname.trim() || !lname.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            toast.error("Please complete all fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            toast.error("Please enter a valid 10-digit phone number");
            return;
        }

        const datos = new URLSearchParams();
        datos.append('fname', fname);
        datos.append('lname', lname);
        datos.append('email', email);
        datos.append('password', password);
        datos.append('phone', phone);

        fetch('http://localhost:3001/users/saveUser', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: datos.toString()
        })
            .then(res => res.json())
            .then(data => {
                console.log('Response:', data);

                toast.success("User registered successfully");
                setTimeout(() => navigate('/movies'), 2000);
                setFName("");
                setLName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setPhone("");

            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("There was an error registering the user");
            });
    };

    const { setUser, setIsAuthenticated } = useUser();

    const login = async (e) => {
        e.preventDefault();


        if (!email.trim() || !password.trim()) {
            toast.error("Please complete all fields");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error("Invalid credentials");
            }
            const data = await response.json();
            setUser(data);
            toast.success("Login successful!");
            setEmail("");
            setPassword("");
            setTimeout(() => navigate('/movies'), 2000);
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Invalid email or password");
        }
    };


    return (
        <div className="body-login">
            <div className="container-login" id="container-login">
                <div className="form-container-login sign-up-container-login">
                    <form className="form-login" action="#">
                        <h1 className="h1-login">Create Account</h1>
                        <div className="social-container-login">
                            <a href="#" className="social-login"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social-login"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social-login"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span className="span-login">or use your email for registration</span>
                        <input className="input-login" value={fname} type="text" placeholder="First Name" onChange={(e) => setFName(e.target.value)} />
                        <input className="input-login" value={lname} type="text" placeholder="Last Name" onChange={(e) => setLName(e.target.value)} />
                        <input className="input-login" value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input className="input-login" value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <input className="input-login" value={confirmPassword} type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                        <input className="input-login" value={phone} type="text" maxLength={10} placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                        <button onClick={saveUser} className="button-login">Sign Up</button>
                        <ToastContainer />
                    </form>
                </div>
                <div className="form-container-login sign-in-container-login">
                    <form className="form-login" action="#">
                        <h1 className="h1-login">Sign in</h1>
                        <input className="input-login" value={email} type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                        <input className="input-login" value={password} type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                        <a href="#" className="a-login">Forgot your password?</a>
                        <button onClick={login} className="button-login">Sign In</button>
                        <ToastContainer />
                    </form>
                </div>
                <div className="overlay-container-login">
                    <div className="overlay-login">
                        <div className="overlay-panel-login overlay-left-login">
                            <h1 className="h1-login">Welcome Back!</h1>
                            <p className="p-login">To keep connected with us please login with your personal info</p>
                            <button className="ghost-login button-login" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel-login overlay-right-login">
                            <h1 className="h1-login">Hello, Friend!</h1>
                            <p className="p-login">Enter your personal details and start journey with us</p>
                            <button className="ghost-login button-login" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
