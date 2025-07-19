import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className='container mx-auto'>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;