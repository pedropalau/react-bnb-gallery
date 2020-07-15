import React, { useState, useCallback } from 'react';
import Link from 'next/link';

import ReactBnbGallery from 'react-bnb-gallery';

import Head from '../components/Head';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import PhotoGrid from '../components/PhotoGrid';

import photos from '../constants/photos';

const Home = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleGallery = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  return (
    <Layout showMenuControls={false}>
      <Head title="Home" />
      <div className="flex flex-col items-star container mx-auto max-w-screen-lg py-10 lg:pt-20 lg:pb-32 px-6 md:px-10">
        <div className="lg:w-2/3">
          <h1 className="text-3xl md:text-4xl text-black leading-snug font-light">
            Friendly, customizable and accessible-ready simple photo gallery based on&nbsp;
            <b className="font-semibold">React</b>
            .
          </h1>
          <div className="flex flex-col md:flex-row md:items-center mt-10 space-y-4 md:space-y-0 md:space-x-4">
            <button
              type="button"
              className="cursor-pointer inline-flex items-center justify-center bg-black py-5 md:px-4 md:py-2 rounded font-semibold text-white border border-transparent shadow hover:bg-green-500 focus:outline-none focus:bg-green-600 focus:shadow-outline-green"
              onClick={toggleGallery}
            >
              View Demo Gallery
            </button>
            <Link href="/docs/installation">
              <a
                className="cursor-pointer inline-flex items-center justify-center bg-white py-5 md:px-4 md:py-2 rounded font-semibold text-gray-900 border border-gray-600 shadow hover:text-gray-100 hover:bg-black hover:border-black focus:outline-none focus:text-gray-100 focus:bg-black focus:border-gray-900 focus:shadow-outline-gray"
                role="button"
              >
                Get Started
              </a>
            </Link>
          </div>
        </div>
      </div>
      <PhotoGrid />
      <ReactBnbGallery
        show={isOpen}
        photos={photos}
        backgroundColor="rgba(0,0,0,0.9)"
        onClose={toggleGallery}
      />
    </Layout>
  );
};

export default Home;
