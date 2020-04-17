import {Component} from 'react';
import Menu from '../components/menu';
import {requestService} from '../services';
import TabClient from './tabClient';

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {clientsData: [], modif: false};
  }

  componentWillMount() {
    this.getClient();
  }

  getClient() {
    requestService.request('GET', '/client')
      .then(data => this.setState({clientsData: data}));
  }

  delClient(id) {
    requestService.request('DELETE', `/client/${id}`).then(data => {
      this.getClient();
    });
  }

  render() {
    return <>
      <TabClient clientsData={this.state.clientsData}
        getClient={this.getClient.bind(this)} delClient={this.delClient.bind(this)}/>
    </>;
  }

}

export default Menu(Homepage, 'clientList');
