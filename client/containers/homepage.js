import {Component} from 'react';
import {Input, Modal, Form, Button } from 'antd';
import Menu from '../components/menu';
import {requestService} from '../services';
import TabClient from './tabClient';

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {clientData: [], modif: false};
  }

  componentDidMount () {
    requestService.request('GET', '/client').then(data => this.setState({clientData: data}));
  }

  render() {
    return <>
      <TabClient clientData={this.state.clientData}/>
      <Modal
        title="Vertically centered modal dialog"
        centered
        visible={this.state.modif}
        onOk={() => console.log('lol')}
        onCancel={() => this.setState({modif: false})}>
        <Form
          initialValues={{ gender: 'male' }}>
          <Form.Item
            label="gender" name="gender"
            rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>;
  }

}

export default Menu(Homepage, 'clientList');
