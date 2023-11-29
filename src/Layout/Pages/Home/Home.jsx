import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Faq from './Faq';
import Featured from './Featured';
import Latest from './Latest';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Featured></Featured>
           <Latest></Latest>
           <HowItWorks></HowItWorks>
           <Testimonials></Testimonials>
           <Faq></Faq>
        </div>
    );
};

export default Home;