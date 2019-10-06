import React, { Component } from 'react';
import './index.scss';
import { sideBarSelector, sidebars, showSidebar } from '../../../../ducks/home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuItem from './menu.item';

interface Props {
  showSidebar: any
  sidebar: any
  sidebars: Function
}

class Sidebar extends Component<Props,
  {}> {

  componentDidMount(): void {
    this.props.sidebars();
  }

  render() {

    const { sidebar } = this.props;
    if (!sidebar) return null;
    const menus = [
      {
        key: 'organizations',
        title: 'Organizations',
        children: sidebar.organizations,
        icon: 'fa  fa-building-o',
        active:true
      },
      {
        key: 'settings',
        title: 'Settings',
        icon: 'icon-settings',
        children: [
          {
            name:'Projects',
            id:'Projects'
          } ,
          {
            name:'Channels',
            id:'Channels'
          }
        ],
      },
    ];
    return (
      <div className="page-sidebar-wrapper">
        <div className="page-sidebar navbar-collapse collapse">
          <ul className={`page-sidebar-menu  page-header-fixed ${this.props.showSidebar?'':'page-sidebar-menu-closed'}`} data-keep-expanded="true" data-auto-scroll="true"
              data-slide-speed="200">


            {
              menus.map((el: any) => (<MenuItem key={el.key} item={el}/>))
            }


          </ul>
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
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
