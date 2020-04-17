import moment from 'moment';
import {Component} from 'react';
import {Table, Button } from 'antd';
import ModifClientModal from './modifClientModal';

export default class TabClient extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clientData: [],
      clientSelect: false,
      modalVisible: false
    };
  }

  render() {
    const columns = [
      {title: 'civilité', dataIndex: 'gender', key: 'gender', 
        render: (gender) => <span>{gender === 'male' ? 'Monsieur' : 'Madame'}</span>},
      {title: 'nom', dataIndex: 'firstname', key: 'firstname'},
      {title: 'prenom', dataIndex: 'lastname', key: 'lastname'},
      {title: 'date de naissance', dataIndex: 'birthdate', key: 'birthdate', 
        render: (gender) => <span>{(new moment(gender)).format('DD/MM/YYYY')}</span>},
      {title: 'email', dataIndex: 'email', key: 'email'},
      {title: 'adresse', key: 'streetNumber', 
        render: (client) => <span>{`${client.streetNumber} ${client.streetAddress},`+
        ` ${client.postalCode} ${client.city}`}</span>},
      {title: 'rue', dataIndex: 'streetAddress', key: 'streetAddress'},
      {title: 'code postal', dataIndex: 'postalCode', key: 'postalCode'},
      {title: 'ville', dataIndex: 'city', key: 'city'},
      {title: 'modifier', dataIndex: 'key', key: 'modifier', 
        render: (key) => <Button type="primary" 
          onClick={() => this.setState({clientSelect: key, modalVisible: true})}>modifier</Button>},
      {title: 'supprimer', dataIndex: 'key', key: 'delete', 
        render: (key) => <Button type="danger" 
          onClick={() => console.log(key)}>supprimer</Button>},
    ];
    const client = this.state.clientSelect === false ? {} :
      this.props.clientData.filter(elem => elem.key === this.state.clientSelect)[0];
    return <>
      <Button type='primary' onClick={() => this.setState({clientSelect: null, modalVisible: true})}>Nouveau</Button>
      <Button type='primary' style={{marginLeft: '10px'}}>Importer</Button>
      <Button type='primary' style={{marginLeft: '10px'}}>Exporter</Button>
      <Table columns={columns} dataSource={this.props.clientData}/>
      <ModifClientModal client={client} clientSelect={this.state.clientSelect} 
        modalVisible={this.state.modalVisible} disableModal={() => this.setState({modalVisible: false})}/>
    </>;
  }

}
