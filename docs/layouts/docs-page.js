import React from 'react';

import DocsNav from '../components/DocsNav';
import Head from '../components/Head';
import Layout from '../components/Layout';

const Doc = ({
  title,
}) => (
  ({ children: content }) => (
    <Layout>
      <Head title={title} />
      <div className="container max-w-screen-lg mx-auto px-10">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/4 lg:pr-10">
            <DocsNav />
          </div>
          <div className="py-10 w-full lg:w-3/4">
            <h1 className="text-2xl lg:text-3xl font-medium flex items-center">
              {title}
            </h1>
            <hr className="my-8 border-b border-gray-200" />
            <div className="prose">
              {content}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
);

export default Doc;
