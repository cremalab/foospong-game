import styled from "styled-components";

const Button = styled<{ subtle: boolean }, "button">("button")`
  font-size: 1.4em;
  margin: 0.2em 0.4em;
  border: 0;
  border-radius: 2px;
  padding: 0.2em 0.4em;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: 0;
  background-color: rgba(255, 255, 255, ${(p: any) => (p.subtle ? 0.2 : 0.9)});
  color: black;
`;

export default Button;
