import React from 'react';

import Spacing from '../../components/Spacing';
import Rule from '../../components/Rule';
import Title from '../../components/Title';

const Heading = ({
    children,
}) => (
    <Spacing top={8}>
        <Title level={2}>
            {children}
        </Title>
        <Rule />
    </Spacing>
);

export default Heading;
