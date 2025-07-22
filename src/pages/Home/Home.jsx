import React from 'react';
import Banner from './Banner';
import Featured from './Featured';
import ContractUs from './ContractUs';

const Home = () => {
    return (
        <div className='container mx-auto'>
            <Banner/>
            <Featured/>
            <ContractUs/>
        </div>
    );
};

export default Home;