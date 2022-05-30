import styled from "styled-components";
import { Button, Card as AntCard } from "antd";
import { Link } from "react-router-dom";
import { Input as antInput } from "antd";


export const CreatedAtText = styled.span`
  font-style: normal;
  font-weight: lighter;
`;

export const CSBWrapper = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  gap: ${(props) => props.gap || 0}%;
  width: ${(props) => props.width}%;
`;

export const CCWrapper = styled(CSBWrapper)`
  justify-content: center;
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
  width: 100%;
  gap: ${(props) => props.gap};
  justify-content: center;
`;

export const ColFSWrapper = styled(ColSAWrapper)`
  justify-content: flex-start;
`;

export const AvatarWrapper = styled.div``;

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
  grid-template-columns: 30% auto;
  gap: 2%;
  
  overflow: auto;
`;

export const CardsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2%;
  margin: 0;
  padding: 0;
`;

export const UserCard = styled(AntCard)`
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.25rem var(--gray);
`;

export const Line = styled.pre`
  font-size: 0.7rem;
  margin-left: 0;
  white-space: pre-wrap;
  counter-increment: line;
  word-wrap: break-word;
  overflow:auto &:before {
    content: counter(line);
    color: var(--gray);
    padding: 0 1em;
  }
`;

export const CodeWrapper = styled.div`
  overflow: auto;
  background-color: var(--light-gray);
  width: 100%;
`;

export const StyleButton = styled(Button)`
  background: var(--egreen);
  border-color: var(--egreen);
  &:focus {
    background: var(--egreen);
    border-color: var(--egreen);
  }
`;

export const UserNameText = styled.span`
  font-weight: bold;
`;

export const UserProfileGistsList = styled.div`
  display: "flex";
  flex-direction: "column";
  justify-content: "flex-start";
  overflow: auto;
  border: 1px solid var(--light-gray);
  border-radius: 1%;
  gap: 2%;
`;

export const FCFCWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
  align-items:center;
`;


export const TextWordBreak = styled.span`
text-align: center;
overflow-wrap: break-word;
`;

export const GistDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const StyledLink = styled(Link)`
font-weight: bold;
`;


export const SearchBox = styled(antInput)`
  background-color: var(--egreen);
  color: var(--white);
  & > .ant-input {
    background-color: var(--egreen);
    color: var(--white);
  }
`;
