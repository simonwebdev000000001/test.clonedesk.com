import React, { Component } from 'react';
import './index.scss';
import { showSidebar, setVal } from '../../../../ducks/home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

interface Props {
  showSidebar: any
  setVal: any
}

class Topbar extends Component<Props,
  {}> {


  private toggleSidebar = () => {
    this.props.setVal({
      key: 'showSidebar',
      value: !this.props.showSidebar,
    });
  };

  render() {

    return (
      <div className="page-header navbar navbar-fixed-top">
        <div className="page-header-inner ">
          <div className="page-logo">
            <Link to={'/'}><h3 className="logo-default">CloneDesk</h3></Link>
            <div className="menu-toggler sidebar-toggler" onClick={this.toggleSidebar}>
              <span></span>
            </div>
          </div>
          <a href="javascript:;" className="menu-toggler responsive-toggler" data-toggle="collapse"
             data-target=".navbar-collapse" > <span></span>
          </a>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({

  showSidebar: showSidebar(state),
});
const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({ setVal }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
