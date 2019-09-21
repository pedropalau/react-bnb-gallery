import React from 'react';

import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Text from '../../components/Text';
import Title from '../../components/Title';

const Help = () => (
  <Container className="container">
    <div style={{ textAlign: "left" }}>
      <Heading>Help</Heading>
      <Title level={3}>Have a question?</Title>
      <Text>Follow the <a href="https://github.com/peterpalau/react-bnb-gallery#install"  target="_blank" rel="noopener noreferrer">quick start</a> guide on <b>GitHub</b> to get up and running quickly. Please do not use Github Issues to report personal support requests.</Text>
      <Text>For any personal contact, please drop me a line to <a href="mailto:pepalauisaac@gmail.com">pepalauisaac@gmail.com</a>.</Text>
      <Title level={3}>Found a bug?</Title>
      <Text>If you find a bug, please read the <a href="https://github.com/peterpalau/react-bnb-gallery/blob/master/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Contribution Guildelines</a> before you report the <a href="https://github.com/peterpalau/react-bnb-gallery/issues" target="_blank" rel="noopener noreferrer">issue</a>.</Text>
    </div>
  </Container>
);

export default Help;
