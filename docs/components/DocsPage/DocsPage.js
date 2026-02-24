import React from 'react';
import PropTypes from 'prop-types';

import Head from '../Head';
import Layout, { LayoutContextConsumer } from '../Layout';
import SidebarDocs from '../SidebarDocs';

const propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const DocsPage = ({
  title,
  path,
  children,
}) => (
  <Layout showHeaderFixed>
    <Head title={title} />
    <div className="container max-w-screen-lg mx-auto px-6 md:px-10">
      <div className="flex flex-col lg:flex-row -mx-6">
        <LayoutContextConsumer>
          {({ navigationOpened }) => (
            <SidebarDocs isOpen={navigationOpened} />
          )}
        </LayoutContextConsumer>
        <div className="py-10 w-full px-6 md:px-8 pt-24 lg:pt-28 lg:px-0 lg:w-2/3">
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h1 className="text-3xl font-semibold flex items-center">{title}</h1>
          </div>
          <div className="prose">{children}</div>
          <footer className="border-t border-gray-200 mt-10 md:mt-4 pt-4 lg:mt-10 lg:pt-6">
            <div className="flex">
              <a
                className="text-green-500 underline"
                href={`https://github.com/peterpalau/react-bnb-gallery/tree/master/docs/pages/${path}`}
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
);

DocsPage.propTypes = propTypes;

export default DocsPage;
