import React from 'react';
import {Form, Input, DatePicker, Select} from 'antd';
import moment from 'moment';
import {requestService} from '../services';
const { Option } = Select;

class ModifClientForm extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.ant-form-item').css('margin', '0 0 5px');
  }

  saveSubmit = async e => {
    e.preventDefault();
    await this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err)  {
        if (this.props.clientSelect !== null) {
          requestService.request('PUT', `/client/${this.props.clientSelect}`, values);
        }
        else requestService.request('POST', `/client`, values);
      }
    });
  };

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
              <Select placeholder='selectionner le genre' size='large' defaultValue="female">
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
    const initialValue = this.props.client !== undefined ?
      {
        name: 'modifClientForm' ,
        mapPropsToFields(props) {
          return {
            birthdate: Form.createFormField({value: new moment(props.client.birthdate)}),
            gender: Form.createFormField({value: props.client.gender}),
            firstname: Form.createFormField({value: props.client.firstname}),
            lastname: Form.createFormField({value: props.client.lastname}),
            email: Form.createFormField({value: props.client.email}),
            postalCode: Form.createFormField({value: props.client.postalCode}),
            city: Form.createFormField({value: props.client.city}),
            streetNumber: Form.createFormField({value: props.client.streetNumber}),
            streetAddress: Form.createFormField({value: props.client.streetAddress}),
          };
        },
      } : {};
    const WrapInfosForm = Form.create(initialValue)(ModifClientForm);
    return (
    // eslint-disable-next-line no-undef
      <div className="info_global_form">
        <div className="info_frame">
          <WrapInfosForm {...this.props} />
        </div>
      </div>
    );
  }

}