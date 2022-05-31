import styled from "styled-components";
import { Card as AntCard } from "antd";

export const Card = styled(AntCard)`
  max-width:100%;
  width:100%;
  max-height:100%;
  height:100%;
  overflow:hidden;
  padding:0;
  border-radius: 1%;
  box-shadow: 0 0.5% 0.5% var(--gray);
  & > .ant-card-body{
    padding: 1%;
  }
`;
