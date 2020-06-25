import React from 'react';

import Layout from '../components/Layout';

const Home = () => (
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
        <button type="button" className="inline-flex items-center bg-green-500 px-6 py-4 rounded font-semibold text-white shadow hover:bg-green-400 focus:outline-none focus:bg-green-600 focus:shadow-outline-green">
          View demo gallery
        </button>
      </div>
    </div>
  </Layout>
);

export default Home;
