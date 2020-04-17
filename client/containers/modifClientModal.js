import {Component} from 'react';
import {Modal} from 'antd';
import ModifClientForm from '../components/modifClientForm';

export default class ModifClientModal extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const title = this.props.client === undefined ? 'Nouveau client' :
      `modification de ${this.props.client.email}`;
    return <>
      <Modal
        title={title}
        centered
        visible={this.props.modalVisible}
        onOk={() => $('#clientForm').click()}
        okText='sauvegarder' cancelText='annuler'
        onCancel={this.props.disableModal}>
        <ModifClientForm modalVisible={this.props.modalVisible} 
          client={this.props.client} clientSelect={this.props.clientSelect} />
      </Modal>
    </>;
  }

}