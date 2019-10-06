import React, { Component } from 'react';

import './index.scss';


export class Loading extends Component<{}, { refreshing: boolean }> {

  state = {
    refreshing: false,
  };



  render() {
    return (
     <div className="loader">
       <div className="spinner">
         <div className="bounce1"></div>
         <div className="bounce2"></div>
         <div className="bounce3"></div>
       </div>
     </div>
    );
  }
}

