import React, { useState, useCallback } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';

import Head from '../components/Head';
import Layout from '../components/Layout';
import Logo from '../components/Logo';

import photos from '../constants/photos';

const Home = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleGallery = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  return (
    <Layout>
      <Head title="Home" />
      <div className="flex flex-col items-center py-10 lg:py-20">
        <h1 className="font-bold text-4xl mt-0 mb-4">
          <div className="w-80">
            <Logo />
          </div>
        </h1>
        <p className="text-lg text-gray-500">
          Friendly, customizable and accessible-ready simple photo gallery based on&nbsp;
          <a className="font-medium text-green-500 underline" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>
          .
        </p>
        <div className="flex items-center mt-6">
          <button
            type="button"
            className="cursor-pointer inline-flex items-center bg-green-400 px-6 py-4 rounded font-semibold text-white shadow hover:bg-green-500 focus:outline-none focus:bg-green-600 focus:shadow-outline-green"
            onClick={toggleGallery}
          >
            View demo gallery
          </button>
        </div>
      </div>
      <ReactBnbGallery
        show={isOpen}
        photos={photos}
        backgroundColor="rgba(0,0,0,0.85)"
        onClose={toggleGallery}
      />
    </Layout>
  );
};

export default Home;
