import React, { useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
// import { css } from '@emotion/react'; // Import css from emotion

function Loader() {
  const [loading, setLoading] = useState(true);
//   const [color, setColor] = useState('#000');

//   // Define the CSS override using emotion
//   const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
//   `;

  return (
    <div style={{marginTop:'150px'}}>
      <div className="sweet-loading text-center">
        {/* You can add a button or input to control loading and color */}
        {/* <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Color of the loader"
        /> */}

        <HashLoader
          color='#000'
          loading={loading}
          css='' // Use css instead of cssOverride
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
