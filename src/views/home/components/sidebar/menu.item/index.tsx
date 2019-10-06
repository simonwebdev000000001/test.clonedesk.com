import React, { Component } from 'react';

interface Props {
  item: any
}

interface State {
  active: boolean
}

export default class MenuItem extends Component<Props, State> {


  state = {
    active: false,
  };

  private toggleView = () => {
    this.setState({ active: !this.state.active });
  };

  render() {

    const { item } = this.props;

    return (
      <li className={`nav-item    ${this.state.active ? ' open' : ''} ${item.active ? ' active' : ''}`}
          onClick={this.toggleView}>
        <a href="javascript:;" className="nav-link nav-toggle" id="sidebar-org">
          <i className={`${item.icon}`}/>
          <span className="title">{item.title}</span>
          <span className={`arrow ${this.state.active ? 'active open' : ''}`}/>
        </a>
        {
          this.state.active && (
            <ul className="sub-menu org_list" style={{display:'block'}}>
              <li className="nav-item">
                <a href="/add-organisation">
                  <i className="fa fa-plus"/>
                  <span className="title">Add {item.title} </span>
                </a>
              </li>
              {
                item.children.map((el: any) => {
                  return (
                    <li className="nav-item show-edit-icon active" key={el.id}>
                      <a href="/hendrik-test/task" className="nav-link">
                        <span className="title">{el.name}</span>
                        {
                          el.tasksOverall && (
                            <span className="badge badge-danger">{el.tasksOverall}</span>
                          )
                        }
                      </a>
                    </li>
                  );
                })
              }

            </ul>
          )
        }


      </li>
    );
  }
}
