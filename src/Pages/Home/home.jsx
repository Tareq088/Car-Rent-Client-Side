import React from 'react';
import Banner from '../../Components/Banner/Banner';
import ChooseUs from '../../Components/ChooseUs/ChooseUs';
import RecentListing from '../../Components/RecentListing/RecentListing';
import ExtraSection from '../../Components/ExtraSection/ExtraSection';
import SpecialOffer from '../../Components/SpecialOffer/SpecialOffer';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ChooseUs></ChooseUs>
            <RecentListing></RecentListing>
            <ExtraSection></ExtraSection>
            <SpecialOffer></SpecialOffer>
        </div>
    );
};

export default Home;