import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export default () => (
  <div style={{ width: '100vw', height: "100vh", border: '2px dashed green' }}>
    <CircularProgress
      style={{ margin: '50vh 50vw' }}
    />
  </div>
);
