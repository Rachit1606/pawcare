import React from "react";

const Star = ({ selected, onClick }) => (
  <span
    style={{
      cursor: 'pointer',
      color: selected ? '#FFD700' : '#ccc',
      fontSize: '24px',
    }}
    onClick={onClick}
  >
    ★
  </span>
);

export default Star;