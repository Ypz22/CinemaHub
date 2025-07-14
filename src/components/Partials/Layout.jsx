// src/components/Layout.jsx
import React from 'react';
import Header from './Header/Header.jsx';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer.jsx';

const Layout = () => {
    return (
        <div>
            <Header />
            <main className="p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
