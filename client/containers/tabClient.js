import moment from 'moment';
import {Component} from 'react';
import {Table, Button, Upload, message, notification, Icon} from 'antd';
import ModifClientModal from './modifClientModal';
import {apiUrl} from '../utils/constant';

export default class TabClient extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clientsData: [],
      clientId: false,
      modalVisible: false
    };
  }


  createNotification(type, message, description) {
    notification[type]({message,description});
  }

  render() {
    const {getClient, clientsData, delClient} =  this.props;
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
          onClick={() => this.setState({clientId: key, modalVisible: true})}>
          modifier
        </Button>},
      {title: 'supprimer', dataIndex: 'key', key: 'delete', 
        render: (key) => <Button type="danger" 
          onClick={() => {
            this.createNotification('success', 'client supprimé',
              'client supprimé avec succès');
            delClient(key);
          }}>
          supprimer
        </Button>},
    ];


    const uploadProps = {
      action: `${apiUrl}/client/import`,
      onChange(info) {
        if (info.file.status === 'done') {
          getClient();
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
      
    const clientSelect = this.state.clientId === false ? {} :
      clientsData.filter(elem => elem.key === this.state.clientId)[0];
    return <>
      <Button type='primary' onClick={() => this.setState({clientId: null, modalVisible: true})}>
        Nouveau
      </Button>
      <Button href={`${apiUrl}/client/export`} type='primary'
        style={{marginLeft: '10px', background: "#02723B", borderColor: "#02723B"}}>
        <Icon type="upload" /> Exporter
      </Button>
      <Upload {...uploadProps}>
        <Button className='CsvButton' type='primary'
          style={{background: "#02723B", borderColor: "#02723B", marginLeft: '10px'}}>
          <Icon type="file-excel" /> Importer
        </Button>
      </Upload>
      <br/><br/>
      <Table columns={columns} dataSource={clientsData}/>
      <ModifClientModal clientSelect={clientSelect} clientId={this.state.clientId} 
        modalVisible={this.state.modalVisible} disableModal={() => this.setState({modalVisible: false})}
        {...this.props}/>
    </>;
  }

}
