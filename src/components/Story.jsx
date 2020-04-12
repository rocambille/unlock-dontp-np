/* eslint-disable react/prop-types */
import React from 'react';

function Story({
  data,
  callback,
}) {
  return (
    <button
      type="button"
      onClick={callback}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        boxSizing: 'border-box',
        padding: '0',
        width: '300px',
        height: '400px',
        marginBottom: '1rem',
        backgroundImage: `url(${data.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <strong
        style={{
          display: 'inline-block',
          boxSizing: 'border-box',
          padding: '1rem',
          backgroundColor: 'white',
        }}
      >
        {data.name}
      </strong>
    </button>
  );
}

export default Story;
