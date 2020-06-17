import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Select from './Select';

const FormItem = Form.Item;

const RenderSelect = props => {
  const {
    input,
    label,
    type,
    children,
    mode,
    meta: { touched, error }
  } = props;
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }

  const onChange = value => {
    console.log('forrrrmik', formik);
    const { formik, name } = props;
    if(mode === 'multiple'){
      formik.handleChange({ target: { value, name } });  
    }
    else{
    formik.handleChange({ target: { value, name } });}
  };

  return (
    <FormItem label={label} validateStatus={validateStatus} help={error}>
      <div>
        <Select
          mode={mode}
          showSearch
          optionFilterProp="children"
          placeholder={label}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          {...input}
          type={type}
          onChange={onChange}
        >
          {children}
        </Select>
      </div>
    </FormItem>
  );
};

RenderSelect.propTypes = {
  formik: PropTypes.object.isRequired,
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default RenderSelect;
