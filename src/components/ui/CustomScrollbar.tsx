import React from 'react';
import styled from 'styled-components';

// 스타일 정의
const StyledScrollbar = styled.ul<{ height: string }>`
  overflow-y: scroll;
  height: ${(props) => props.height};
  list-style: none;
  padding: 0;

  /* 스크롤바 화살표 숨기기 */
  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 10px;
  }
`;

// CustomScrollbar 컴포넌트
const CustomScrollbar: React.FC<{ children: React.ReactNode; height?: string }> = ({ children, height = '160px' }) => {
  return <StyledScrollbar height={height}>{children}</StyledScrollbar>;
};

export default CustomScrollbar;
