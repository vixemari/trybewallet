import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { value, onChange, name, type, label } = this.props;
    return (
      <div>
        <label htmlFor={ name }>
          {label}
          <input
            type={ type }
            data-testid={ `${name}-input` }
            name={ value }
            onChange={ onChange }
          />
        </label>
      </div>
    );
  }
}
Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
export default Input;
