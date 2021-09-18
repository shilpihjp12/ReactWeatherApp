import React from 'react';

import classes from './Spinner.module.css';

/**
 * generic component is created for spinner showing throughout application
 * @returns 
 */
const Spinner = () => {
  const { Spinner } = classes;
  return (
    <div className={Spinner}>
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  )
};

export default Spinner;