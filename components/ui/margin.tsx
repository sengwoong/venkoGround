import React from 'react';

interface MarginProps {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  all?: number;
}

const Margin: React.FC<MarginProps> = ({ top, left, bottom, right, all }) => {
  const style: React.CSSProperties = {
    marginTop: top ? `${top}px` : undefined,
    marginLeft: left ? `${left}px` : undefined,
    marginBottom: bottom ? `${bottom}px` : undefined,
    marginRight: right ? `${right}px` : undefined,
    margin: all ? `${all}px` : undefined
  };

  return (
    <div style={style}></div>
  );
}

export default Margin;
