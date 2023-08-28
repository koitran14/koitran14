import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const BioSection = styled(Box)`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    justify-content: start;
    margin-bottom: 1rem;
`

export const BioYear = styled.span`
    font-weight: bold;
`

export const BioDesc = styled.span`
    text-align: justify;
    grid-column: span 2;
`