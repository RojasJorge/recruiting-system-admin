// import { useState, useEffect } from 'react';
import Proptypes from 'prop-types';

const FormControls = ({ children }) => {
  const onFinish = e => {
    console.log(e);
  };
  const onChange = e => {
    console.log(e);
  };
  return <div>{children}</div>;
};

FormControls.propTypes = {
  children: Proptypes.node.isRequired,
};

FormControls.defaultProps = {
  children: <></>,
};

export default FormControls;
