import React from 'react';
import Prism from 'prismjs';

const withPrism = (WrappedComponent) => {
  class WithPrismHOC extends React.PureComponent {
    componentDidMount() {
      Prism.highlightAll();
    }

    render() {
      return (
        <WrappedComponent />
      );
    }
  }

  return WithPrismHOC;
};

export default withPrism;
