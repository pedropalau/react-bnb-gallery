import React, { useState, useCallback } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';

import Layout from '../components/Layout';

const photos = [
  {
    photo: '/images/demo/photo-1592495642201-545a850bcd95.jpeg',
    caption: 'Lorem ipsun dolor',
  },
  {
    photo: '/images/demo/photo-1592530190503-58ad9702cdf0.jpeg',
    caption: 'Lorem ipsun dolor',
  },
  {
    photo: '/images/demo/photo-1592750177282-6fcb5ba3568e.jpeg',
    caption: 'Lorem ipsun dolor',
  },
  {
    photo: '/images/demo/photo-1592819649132-7838ae2b130c.jpeg',
    caption: 'Lorem ipsun dolor',
  },
  {
    photo: '/images/demo/photo-1592831298945-66c4c6714702.jpeg',
    caption: 'Lorem ipsun dolor',
  },
  {
    photo: '/images/demo/photo-1592838948611-69071139f9e9.jpeg',
    caption: 'Lorem ipsun dolor',
  },
  {
    photo: '/images/demo/photo-1592931818797-10a8288304f9.jpeg',
    caption: 'Lorem ipsun dolor',
  },
];

const Home = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleGallery = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  return (
    <Layout>
      <div className="flex flex-col items-center py-10 lg:py-20">
        <h1 className="font-bold text-4xl mt-0 mb-2">
          React photo gallery
        </h1>
        <p className="text-lg text-gray-500">
          Friendly, customizable and accessible-ready simple photo gallery based on&nbsp;
          <a className="font-medium text-green-500 underline" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>
          .
        </p>
        <div className="flex items-center mt-6">
          <button
            type="button"
            className="inline-flex items-center bg-green-500 px-6 py-4 rounded font-semibold text-white shadow hover:bg-green-400 focus:outline-none focus:bg-green-600 focus:shadow-outline-green"
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
