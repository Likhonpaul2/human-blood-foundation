import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';

const MainLayout = () => {
    return (
        <>
            <div className='container mx-auto'>
                <Navbar />
            </div>
                <Outlet />
            <Footer />

        </>
    );
};

export default MainLayout;