import {Component} from 'react';
import Menu from '../components/menu';
import {Table, Select} from 'antd';
import {requestService} from '../services';
import moment from 'moment';

const {Option} = Select;

class Statistic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      statisticKey: 'postalCode',
      statisticName: 'Département',
      statisticData: []
    };
  }

  componentDidMount() {
    this.getStatistic();
  }

  getStatistic() {
    requestService.request('GET', `/client/stat?${this.state.statisticKey}`)
      .then(data => this.setState({statisticData: data}));
  }

  render() {
    const columns = [
      {
        title: this.state.statisticName,
        render: (complete) => <span>{this.state.statisticKey === 'birthdate' ? 
          (new moment(complete[this.state.statisticKey])).format('DD/MM/YYYY') :
          complete[this.state.statisticKey]}</span>,
        key: 'name'
      },
      {
        title: 'Total',
        render: (complete) => <span>{complete[`${this.state.statisticKey}Total`]}</span>,
        key: 'total'
      },
    ];
    return <>
      <Select onChange={(key, complete) => {
        this.setState({statisticName: complete.props.children, 
          statisticKey: key}, this.getStatistic);
      }} style={{width: '40%'}} placeholder='selectionner la statistique'
      defaultValue={this.state.statisticKey} size='large'>
        <Option value="postalCode">Département</Option>
        <Option value="birthdate">Date de naissance</Option>
        <Option value="streetNumber">numéro de rue</Option>
        <Option value="streetAddress">Adresse</Option>
        <Option value="city">Ville</Option>
        <Option value="gender">Civilité</Option>
        <Option value="firstname">Prénom</Option>
        <Option value="lastname">Nom</Option>
      </Select>
      <br/><br/>
      <Table dataSource={this.state.statisticData} columns={columns} />
    </>;
  }

}

export default Menu(Statistic, 'statistic');
