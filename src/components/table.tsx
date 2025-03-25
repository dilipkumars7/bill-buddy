"use client";
import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { AddCircle } from 'iconsax-react';

const TableContainer = styled.div`
  width: 100%;
  border: 1.5px solid #091E4224;
  border-radius: 5px;
  overflow: hidden;
`;

const TableWrapper = styled.div`
  display: block;
  width: max-content;
`;

const HeaderRow = styled.div`
  display: flex;
  width: max-content;
  font-size: 14px;
  font-weight: bold;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 2;
  box-shadow: ${(props) =>
    props.isScrolled ? "rgba(0, 0, 0, 0.09) 0px 3px 12px;" : "none"};
`;

const ScrollableBody = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: auto;
  position: relative;
`;

const Row = styled.div`
  display: flex;
  width: max-content;
  font-size: 13px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const AddColumn = styled.div`
    position: absolute;
    right: 8px;
    top: 33px;
    width: 34px;
    height: 40px;
    cursor: pointer;
    background-color: white;
    border-left: 1px solid #091E4224;
    border-right: 1px solid #091E4224;
    z-index: 200;
    border-top-right-radius: 5px;
    display:flex;
    align-items: center;
    justify-content: center;
`

const Cell = styled.div<{ isResizerHovered?: boolean }>`
  position: relative;
  padding: 10px;
  border-left: 1px solid #091E4224;
  border-bottom: 1px solid #091E4224;
  overflow: hidden;
  white-space: nowrap;
  min-width: 150px;
  text-align: center;
  border-right: ${(props) => (props.isResizerHovered ? "2px solid #408CF9" : "")};
`;

const HeaderCell = styled.div`
  position: relative;
  padding: 10px;
  border-left: 1px solid #091E4224;
  border-bottom: 1px solid #091E4224;
  overflow: hidden;
  white-space: nowrap;
  min-width: 150px;
  display:flex;
  justify-content: left;
  align-items: center;
  gap: 0.5em;
  user-select: none;
`;

const Resizer = styled.div`
  position: absolute;
  right: -6px;
  top: 0;
  bottom: 0;
  width: 9px;
  cursor: col-resize;
  background-color: transparent;
  z-index: 1;
  user-select: none;

  &:hover {
    background-color: #408CF9;
  }
`;

const DropDownSort = styled.div`
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  width: 15px;
  cursor: pointer;
  background-color: transparent;
  z-index: 1;
  user-select: none;
  background-color: #408CF9;
`;

interface TableProps {
  TableHeader: { HeaderKey: string; defaultWidth: string, HeaderIcon: JSX.Element, HeaderName: string }[];
  TableData: { [key: string]: any }[];
}

export default function SdkTable({ TableHeader, TableData }: TableProps) {
  const columnWidthsRef = useRef(
    TableHeader.map((item) => Number(item.defaultWidth) || 150)
  );
  const [columnWidths, setColumnWidths] = useState(columnWidthsRef.current);
  const [totalTableWidth, setTotalTableWidth] = useState(
    columnWidthsRef.current.reduce((acc, w) => acc + w, 20)
  );
  const resizingIndex = useRef<number | null>(null);
  const resizeOffset = useRef(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [hoveredResizer, setHoveredResizer] = useState<number | null>(null);

  const scrollableBodyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      // Set shadow based on vertical scroll
      setIsScrolled(target.scrollTop > 0);
      // Synchronize header horizontal scroll
      if (headerRef.current) {
        headerRef.current.style.transform = `translateX(-${target.scrollLeft}px)`;
      }
    };

    const bodyElement = scrollableBodyRef.current;
    if (!bodyElement) return;

    bodyElement.addEventListener("scroll", handleScroll);
    return () => {
      bodyElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseMove = (event: MouseEvent) => {
    if (resizingIndex.current === null) return;

    requestAnimationFrame(() => {
      const newWidths = [...columnWidthsRef.current];
      const newWidth = Math.max(50, newWidths[resizingIndex.current] + event.clientX - resizeOffset.current);

      newWidths[resizingIndex.current] = newWidth;
      columnWidthsRef.current = newWidths;
      setColumnWidths(newWidths);
      setTotalTableWidth(newWidths.reduce((acc, w) => acc + w, 20));

      resizeOffset.current = event.clientX;
    });
  };

  const handleMouseUp = () => {
    resizingIndex.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (index: number, event: React.MouseEvent) => {
    resizingIndex.current = index;
    resizeOffset.current = event.clientX;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <TableContainer>
      <TableWrapper style={{ width: `${totalTableWidth}px` }}>
        {/* Header Row */}
        <HeaderRow ref={headerRef} isScrolled={isScrolled}>
          {TableHeader.map((item, index) => (
            <HeaderCell key={index} style={{ width: `${columnWidths[index]}px`}} onMouseEnter={() => setHoveredColumn(index)} onMouseLeave={() => setHoveredColumn(null)}>
              {item.HeaderIcon}
              <div>{item.HeaderName}</div>
              {/* <div id="sort-icon">I</div> */}
              <Resizer onMouseDown={(event) => handleMouseDown(index, event)} onMouseEnter={() => setHoveredResizer(index)} onMouseLeave={() => setHoveredResizer(null)}  />
              {hoveredColumn === index && (
              <>
                <div id="sort-icon">I</div>
                <DropDownSort />
              </>
            )}
            </HeaderCell>
          ))}
        </HeaderRow>
        <AddColumn><AddCircle size="25" color="#0052CC" variant="Bulk"/></AddColumn>
      </TableWrapper>

      {/* Scrollable Table Body */}
      <ScrollableBody ref={scrollableBodyRef} id="scrollable-body">
        <TableWrapper style={{ width: `${totalTableWidth}px` }}>
          {TableData.map((item, rowIndex) => (
            <Row key={rowIndex}>
              {TableHeader.map((header, colIndex) => (
                <Cell key={colIndex} style={{ width: `${columnWidths[colIndex]}px` }} isResizerHovered={hoveredResizer === colIndex}>
                  {item[header.HeaderKey]}
                </Cell>
              ))}
            </Row>
          ))}
        </TableWrapper>
      </ScrollableBody>
    </TableContainer>
  );
}
