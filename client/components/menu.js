import { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Router from 'next/router';

const { Content, Sider } = Layout;

export default function (SubMenuPage, selected) {
  return  class menu extends Component {

    constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
      };
    }

    componentDidMount() {
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
    }

    handleResize = () => {
      const windowSize = window.innerWidth;
      if (windowSize < 1290 && this.state.collapsed !== true) this.setState({collapsed: true});
      else if (windowSize > 1290 && this.state.collapsed !== false) this.setState({collapsed: false});
    }

    render () {
      const style = {
        sider: { background: '#fff' },
        menuGlobal: { height: '1200px', borderRight: 0},
        layout: {padding: '0 24px 24px'},
        breadcrumb: {margin: '16px 0'},
        breadcrumbContent: {background: '#fff', padding: 24, margin: 0, minHeight: 280},
        logoutButton: {width: '160px', marginLeft: '10px'}
      };
      return (
        <Layout>
          <Layout>
            <Sider width={200} style={style.sider} collapsible 
              collapsed={this.state.collapsed}
              onCollapse={() => this.setState({collapsed: !this.state.collapsed})}>
              <Menu theme="dark" mode="inline" 
                defaultSelectedKeys={[selected]}
                style={style.menuGlobal}>
                <Menu.Item key="clientList" onClick={() => Router.push(`/`)}> 
                  <Icon type="bar-chart"/>
                  <span className="nav-text">Liste Client</span>
                </Menu.Item>
                <Menu.Item key="Statistic" onClick={() => Router.push(`/stat`)}> 
                  <Icon type="bar-chart"/>
                  <span className="nav-text">Statistiques Client</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={style.layout}>
              <Breadcrumb style={style.breadcrumb}>
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>{selected}</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={style.breadcrumbContent}>
                <SubMenuPage jquery={this.state.jquery} {...this.props}/>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      );
    }
  
  };
}