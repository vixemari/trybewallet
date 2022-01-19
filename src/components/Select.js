import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Select extends Component {
  render() {
    const { option = [], onChange, name, label } = this.props;
    return (
      <div>
        <label htmlFor={ name }>
          {label}
          <select
            data-testid={ `${name}-input` }
            id={ name }
            name={ name }
            onChange={ onChange }
          >
            { option.map((item) => (
              <option key={ item } value={ item }>{item}</option>
            )) }
          </select>
        </label>
      </div>
    );
  }
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  option: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Select;
