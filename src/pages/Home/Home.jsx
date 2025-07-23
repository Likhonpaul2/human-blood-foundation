import React from 'react';
import Banner from './Banner';
import Featured from './Featured';
import ContractUs from './ContractUs';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import { EventsSection } from './EventsSection';
import { StatsSection } from './StatsSection';
import { CallToAction } from './CallToAction';

const Home = () => {
    return (
        <div className='container mx-auto'>
            <Banner/>
            <Featured/>
            <HowItWorks/>
            <Testimonials/>
            <EventsSection/>
            <StatsSection/>
            <CallToAction/>

            <ContractUs/>
        </div>
    );
};

export default Home;