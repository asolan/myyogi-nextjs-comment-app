import React from 'react';

import './Backdrop.css'

const Backdrop = props => <div className={props.show ? 'backdrop show' : 'backdrop'} />;

export default Backdrop;