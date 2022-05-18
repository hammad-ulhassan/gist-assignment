import styled from "styled-components";
import { Input as antInput } from "antd";

export const SearchBox = styled(antInput)`
  background-color: var(--egreen);
  color: var(--white);
  & > .ant-input {
    background-color: var(--egreen);
    color: var(--white);
  }
`;
