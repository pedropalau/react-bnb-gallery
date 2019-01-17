import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Container from '../Container';
import Rule from '../Rule';
import Title from '../Title';

import './component.css';

const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: null,
};

const Section = ({
  title,
  children,
}) => (
  <Fragment>
    <Rule />
    <section className="section">
      <Container className="container">
        {title && <Title>{title}</Title>}
        {children}
      </Container>
    </section>
  </Fragment>
);

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;

export default Section;
