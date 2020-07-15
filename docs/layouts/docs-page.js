import React from 'react';

import Head from '../components/Head';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';

const Doc = ({
  title,
  __resourcePath,
}) => (
  ({ children: content }) => (
    <Layout>
      <Head title={title} />
      <div className="container max-w-screen-lg mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row -mx-6">
          <div className="hidden fixed inset-0 pt-16 h-full bg-white z-90 w-full border-b -mb-16 lg:-mb-0 lg:static lg:h-auto lg:overflow-y-visible lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block lg:border-0 xl:w-1/5">
            <Sidebar />
          </div>
          <div className="py-10 w-full px-6 md:px-8 lg:px-0 lg:w-3/4">
            <h1 className="text-2xl lg:text-3xl font-medium flex items-center">
              {title}
            </h1>
            <hr className="my-8 border-b border-gray-200" />
            <div className="prose">
              {content}
            </div>
            <footer className="border-t border-gray-200 mt-10 md:mt-4 pt-4 lg:mt-10 lg:pt-6">
              <div className="flex lg:justify-end">
                <a
                  className="text-green-500 hover:underline"
                  href={`https://github.com/peterpalau/react-bnb-gallery/tree/master/docs/pages/${__resourcePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Edit this page on GitHub
                </a>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </Layout>
  )
);

export default Doc;
