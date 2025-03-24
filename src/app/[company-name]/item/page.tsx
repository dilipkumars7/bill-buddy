"use client";
import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`;

const ResizableDiv = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  overflow: auto;
  min-width: 100px;
  max-width: 80%;
  position: relative;
`;

const Resizer = styled.div`
  width: 2px;
  cursor: col-resize;
  background-color: #ccc;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  &:hover {
    background-color: #999;
  }
`;

export default function ItemPage() {
  const resizableRef = useRef(null);

  useEffect(() => {
    if (!resizableRef.current) return;
  }, []);

  const handleMouseDown = (event) => {
    if (!resizableRef.current) return;
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = resizableRef.current.offsetWidth;

    const onMouseMove = (moveEvent) => {
      if (!resizableRef.current) return;
      const newWidth = startWidth + (moveEvent.clientX - startX);
      if (newWidth > 100 && newWidth < window.innerWidth * 0.8) {
        resizableRef.current.style.width = `${newWidth}px`;
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <Container>
      <ResizableDiv ref={resizableRef}>
        Resizable Content
        <Resizer onMouseDown={handleMouseDown} />
      </ResizableDiv>
      <div style={{ flex: 1, padding: '20px' }}>Main Content</div>
    </Container>
  );
}
