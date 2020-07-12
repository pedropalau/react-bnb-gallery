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
    <Layout showHeader={false}>
      <Head title="Home" />
      <div className="flex flex-col items-star container mx-auto max-w-screen-md py-10 lg:py-32">
        <h1 className="font-bold text-4xl mt-0 mb-8">
          <div className="w-64">
            <Logo />
          </div>
        </h1>
        <p className="text-lg text-gray-500">
          Friendly, customizable and accessible-ready simple photo gallery based on&nbsp;
          <a className="font-medium text-green-500 underline" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>
          .
        </p>
        <div className="flex items-center mt-10 space-x-4">
          <button
            type="button"
            className="cursor-pointer inline-flex items-center bg-black px-4 py-2 rounded font-semibold text-white border border-transparent shadow hover:bg-green-500 focus:outline-none focus:bg-green-600 focus:shadow-outline-green"
            onClick={toggleGallery}
          >
            View Demo Gallery
          </button>
          <Link href="/docs/installation">
            <a
              className="cursor-pointer inline-flex items-center bg-white px-4 py-2 rounded font-semibold text-gray-900 border border-gray-600 shadow hover:text-gray-100 hover:bg-black hover:border-black focus:outline-none focus:text-gray-100 focus:bg-gray-900 focus:border-gray-900 focus:shadow-outline-gray"
              role="button"
            >
              Get Started
            </a>
          </Link>
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
