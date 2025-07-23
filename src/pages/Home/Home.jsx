import React, { useEffect } from 'react';
import Banner from './Banner';
import Featured from './Featured';
import ContractUs from './ContractUs';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import { EventsSection } from './EventsSection';
import { StatsSection } from './StatsSection';
import { CallToAction } from './CallToAction';

const Home = () => {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    return (
        <div className=''>
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