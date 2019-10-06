import React, { Component } from 'react';
import './index.scss';
import { sideBarSelector, sidebars, showSidebar } from '../../ducks/home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
import MainArea from './components/mainarea';

interface Props {
  showSidebar: any
  sidebars: Function
}

class HomePage extends Component<Props,
  {}> {

  render() {

    return (
    <div className={`page-header-fixed page-sidebar-closed-hide-logo page-content-white page-md ng-scope ${this.props.showSidebar?'':'page-sidebar-closed'}`}>
      <div className={'page-wrapper'}>
        <Topbar/>
        <div className="clearfix"/>
        <div className={'page-container'}>
          <Sidebar/>
          <MainArea/>


          <div className="page-footer page-header-fixed page-sidebar-closed-hide-logo page-container-bg-solid">
            <div className="page-footer-inner"> 2019 © CloneDesk by
              <a target="_blank" href="https://www.hewo-internetmarketing.de">HEWO Internetmarketing</a> &nbsp;|&nbsp;
              <a href="https://www.hewo-internetmarketing.de/impressum/" target="_blank">Impress</a> &nbsp;|&nbsp;
              <a href="https://www.hewo-internetmarketing.de/impressum/datenschutzbestimmungen" target="_blank">Privacy
                Policy</a>&nbsp;|&nbsp;
              <a href="https://clonedesk.com/changelog/" target="_blank">Changelog</a>
              <div className="scroll-to-top" >
                <i className="icon-arrow-up"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  sidebar: sideBarSelector(state),
  showSidebar: showSidebar(state),
});
const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    sidebars,
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
