import React from 'react';
import {Form, Input, DatePicker, Select, notification} from 'antd';
import moment from 'moment';
import {requestService} from '../services';

const { Option } = Select;

let autosuggestOptions;
class ModifClientForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      autosuggestOptions: []
    };
  }

  createNotification(type, message, description) {
    notification[type]({message,description});
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    $('.ant-form-item').css('margin', '0 0 5px');
  }

  saveSubmit = async e => {
    e.preventDefault();
    await this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err)  {
        if (this.props.clientId !== null) {
          requestService.request('PUT', `/client/${this.props.clientId}`, values)
            .then(() => {
              this.createNotification('success', 'modification effectuée',
                'modification effectuée avec succès');
              this.props.disableModal();
              this.props.getClient();
            });
        }
        else {
          requestService.request('POST', `/client`, values)
            .then(() => {
              this.createNotification('success', 'client créé',
                'client créé avec succès');
              this.props.disableModal();
              this.props.getClient();
            });
        }
      }
    });
  };

  handleSearch(search) {
    requestService.requestExtern('GET', `https://api-adresse.data.gouv.fr/search/?q=${search}`)
      .then(option => {
        autosuggestOptions = option.features.map(elem => elem.properties);
        if (autosuggestOptions.length > 0 && autosuggestOptions !== undefined) {
          this.setState({autosuggestOptions:  autosuggestOptions});
        }
      });
  }

  handleChange(search) {
    const selectAddr = autosuggestOptions.filter(elem => elem.label === search)[0];
    this.props.form.setFieldsValue({
      city: selectAddr.city,
      postalCode: selectAddr.postcode,
      streetNumber: selectAddr.housenumber,
      streetAddress: selectAddr.street
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <>
        <Form onSubmit={this.saveSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('birthdate')(<DatePicker format='DD/MM/YYYY' size='large' placeholder='date de naissance'/>)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('gender')(
              <Select placeholder='selectionner le genre' size='large'>
                <Option value="male">Monsieur</Option>
                <Option value="female">Madame</Option>
              </Select>)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('firstname')(<Input className='info_input' size='large' placeholder='prénom'/>)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('lastname')(<Input className='info_input' size='large' placeholder='nom'/>)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email')(<Input className='info_input' size='large' placeholder='email'/>)}
          </Form.Item>
          <br/><br/><br/>
          <Select showSearch
            placeholder='autosuggestion addresse' defaultActiveFirstOption={false}
            showArrow={false} filterOption={false} onSearch={this.handleSearch.bind(this)} onChange={this.handleChange.bind(this)}
            notFoundContent={null} size='large'>
            {this.state.autosuggestOptions.map(
              address => <Option value={address.label}>{address.label}</Option>  
            )}
          </Select>
          <br/><br/>
          <Form.Item>
            {getFieldDecorator('postalCode')(<Input className='info_input' size='large' type='number' placeholder='code postal'/>)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('city')(<Input className='info_input' size='large' placeholder='ville'/>)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('streetNumber')(<Input className='info_input' size='large' type='number' placeholder='numéro de rue'/>)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('streetAddress')(<Input className='info_input' size='large' placeholder='rue'/>)}
          </Form.Item>
          <button id='clientForm' style={{display: 'none'}}/>
        </Form>
      </>
    );
  }

}

export default class extends React.Component {

  constructor(props) {
    super(props);
  }
      
  render() {
    const initialValue = this.props.clientSelect !== undefined ? {
      name: 'modifClientForm' ,
      mapPropsToFields(props) {
        return {
          birthdate: Form.createFormField({value: new moment(props.clientSelect.birthdate)}),
          gender: Form.createFormField({value: props.clientSelect.gender}),
          firstname: Form.createFormField({value: props.clientSelect.firstname}),
          lastname: Form.createFormField({value: props.clientSelect.lastname}),
          email: Form.createFormField({value: props.clientSelect.email}),
          postalCode: Form.createFormField({value: props.clientSelect.postalCode}),
          city: Form.createFormField({value: props.clientSelect.city}),
          streetNumber: Form.createFormField({value: props.clientSelect.streetNumber}),
          streetAddress: Form.createFormField({value: props.clientSelect.streetAddress}),
        };
      },
    } : {};
    const WrapInfosForm = Form.create(initialValue)(ModifClientForm);
    return <WrapInfosForm {...this.props} />;
  }

}