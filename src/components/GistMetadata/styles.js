import styled from 'styled-components';

export const RowFS = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2%;
  padding: 1%;
  align-items: ${props => props.isInTable?'center':'stretch'};
  width: 100%;
`;

export const ColC = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
`;
