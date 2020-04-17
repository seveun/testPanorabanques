import {Component} from 'react';
import {Modal} from 'antd';
import ModifClientForm from '../components/modifClientForm';

export default class ModifClientModal extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const title = this.props.clientSelect === undefined ? 'Nouveau client' :
      `modification de ${this.props.clientSelect.email}`;
    return <>
      <Modal
        title={title} centered
        visible={this.props.modalVisible}
        // eslint-disable-next-line no-undef
        onOk={() => $('#clientForm').click()}
        okText='sauvegarder' cancelText='annuler'
        onCancel={() => {
          this.props.disableModal();
          this.props.getClient();
        }}>
        <ModifClientForm modalVisible={this.props.modalVisible} 
          clientSelect={this.props.clientSelect} clientId={this.props.clientId}
          {...this.props} />
      </Modal>
    </>;
  }

}