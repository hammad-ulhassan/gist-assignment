import styled from "styled-components";
import { Button, Card as AntCard } from "antd";

export const OYAWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const GistCardStyled = styled(AntCard)`
  max-width: 90vw;
  min-width: 100%;

`;

export const CSBWrapper = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  gap: ${(props) => props.gap || 0}%;
`;

export const NumberDisplay = styled.span`
border: 1px solid var(--gray);
border-radius: 5px;
padding: 0 0.8rem;
margin: 0;
`;

export const TextLine = styled.span`
margin: 0;
padding: 0 0.25rem;
word-wrap: normal;
`;

export const ColSAWrapper = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  height: 100%;
  gap: ${(props) => props.gap};
`;

export const CSAWrapper = styled(CSBWrapper)`
  justify-content: space-around;
`;


export const CFEWrapper = styled(CSBWrapper)`
  justify-content: flex-end;
`;

export const CFSWrapper = styled(CSBWrapper)`
  justify-content: flex-start;
`;

export const ContentWrapper = styled.div`
  height: 100%;
  padding: 0 10%;
`;

export const HomePageLayout = styled.div`
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-rows: 10vh auto;

  //background-color: black;
`;

export const UserProfileWrapper = styled.section`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr;
  grid-template-columns: 40% auto;
`;

export const CardsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
  margin: 0;
  padding: 0;
`;

export const UserCard = styled(AntCard)`
  max-width: 28rem;
  max-height: 22rem;
  min-height: 22rem;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.25rem var(--gray);
`;

export const Line = styled.pre`
  font-size: 0.7rem;
  margin-left: 0;
  counter-increment: line;
  &:before {
    content: counter(line);
    color: var(--gray);
  }
`;

export const StyleButton = styled(Button)`
  background: var(--egreen);
  border-color: var(--egreen);
  &:focus{
    background: var(--egreen);
    border-color: var(--egreen);
  }
`;