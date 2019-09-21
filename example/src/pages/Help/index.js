import React from 'react';

import Container from '../../components/Container';
import Text from '../../components/Text';
import Title from '../../components/Title';

const Help = () => (
  <Container className="container" style={{ textAlign: 'left' }}>
    <Title level={4}>Have a question?</Title>
    <Text inherit>Follow the <a href="https://github.com/peterpalau/react-bnb-gallery#install"  target="_blank" rel="noopener noreferrer">quick start</a> guide on GitHub to get up and running quickly. Please do not use Github Issues to report personal support requests. For any personal contact, please drop me a line to <a href="mailto:pepalauisaac@gmail.com">pepalauisaac@gmail.com</a></Text>
    <Title level={4}>Found a bug?</Title>
    <Text inherit>If you find a bug, please read the <a href="https://github.com/peterpalau/react-bnb-gallery/blob/master/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Contribution Guildelines</a> before you report the <a href="https://github.com/peterpalau/react-bnb-gallery/issues" target="_blank" rel="noopener noreferrer">issue</a>.</Text>
  </Container>
);

export default Help;
