import React, { Component } from 'react';
import './index.scss';
import { sideBarSelector, sidebars } from '../../../../ducks/home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

interface Props {
}

class Topbar extends Component<Props,
  {}> {


  render() {

    return (

      <div className="page-content-wrapper">
        <div className="page-content " style={{ minHeight: 1000 }}>


        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({});
const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({}, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
