import React from 'react';
import styled from 'styled-components';

const ToggleWrapper = styled.div`
  width: 50px;
  min-width: 50px;
  height: 25px;
  border-radius: 25px;
  border: 1px solid #666;
  grid-area: toggle;
  margin: auto;
  display: flex;
  background-image: linear-gradient(
    to bottom,
    ${props => props.theme.third},
    ${props => props.theme.text}
  );
`;

const Notch = styled.div`
  height: 21px;
  width: 21px;
  border: 1px solid #666;
  margin-top: 1px;
  background-color: white;
  border-radius: 50%;
  transition: tansform 0.1s linear;
  transform: translate(${props => (props.isActive ? '26px' : '1px')});
`;
const Toggle = ({ isActive, onToggle }) => {
  return (
    <ToggleWrapper onClick={onToggle}>
      <Notch isActive={isActive} />
    </ToggleWrapper>
  );
};

export default Toggle;
