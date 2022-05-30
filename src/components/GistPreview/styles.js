import styled from "styled-components";

export const GistContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
  padding: 1%;
`;

export const CodeBlock = styled.div`
  overflow: scroll;
  border: 1px var(--light-gray) solid;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.25rem var(--gray);
  padding: 1%;
  cursor: pointer;
`;

export const GistMetaData = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2%;
  padding: 1%;
`;


