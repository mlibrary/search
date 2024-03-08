import React from 'react';
import { Alert, Anchor } from '../../../reusable';
import { connect } from 'react-redux';
import { getField, getFieldValue } from '../../../records/utilities';
import { placeHold } from '../../../pride';
import PropTypes from 'prop-types';

const Select = ({ field, setFieldChange }) => {
  const { name, value, options } = field;

  return (
    <select id={name} name={name} className='dropdown' value={value} onChange={setFieldChange} autoComplete='off'>
      {options.map((option, key) => {
        return (
          <option
            key={key}
            value={option.value}
            disabled={option.disabled && 'disabled'}
          >
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

Select.propTypes = {
  field: PropTypes.object,
  setFieldChange: PropTypes.func
};

const Field = ({ field, setFieldChange, loading }) => {
  const { type, name, value } = field;

  if (type === 'hidden') {
    return (
      <input id={name} type={type} name={name} value={value} onChange={setFieldChange} />
    );
  } else if (type === 'select') {
    return (
      <div className='form-group'>
        {field.label && (
          <label className='form-label' htmlFor={field.name}>{field.label}</label>
        )}
        <Select field={field} setFieldChange={setFieldChange} />
      </div>
    );
  } else if (type === 'submit') {
    return (
      <button
        className='button margin-right-1'
        id={name}
        type={type}
        name={name}
        disabled={loading}
      >
        {loading ? 'Placing hold ...' : value}
      </button>
    );
  }

  return (
    <div className='form-group'>
      {field.label && (
        <label className='form-label' htmlFor={field.name}>{field.label}</label>
      )}
      <input className='form-control' id={name} type={type} name={name} value={value} onChange={setFieldChange} />
    </div>
  );
};

Field.propTypes = {
  field: PropTypes.object,
  setFieldChange: PropTypes.func,
  loading: PropTypes.bool
};

class GetThisForm extends React.Component {
  state = {
    fields: this.props.form.fields
  };

  setFieldChange = (event) => {
    // Update field with user changed value.
    const fields = this.state.fields.reduce((acc, field) => {
      if (field.name === event.target.name) {
        return acc.concat({
          ...field,
          value: event.target.value
        });
      } else {
        return acc.concat(field);
      }
    }, []);

    this.setState({ fields });
  };

  handleSubmit = (event) => {
    const { datastoreUid, recordId, form } = this.props;
    const { loading, fields } = this.state;

    // Submitted form is type ajax and not already loading.
    if (form.type === 'ajax' && !loading) {
      event.preventDefault();

      const getFieldValueByName = (name) => {
        const field = fields.filter((field) => {
          return field.name === name;
        })[0];

        if (field) {
          return field.value;
        }
      };
      const callback = (response) => {
        this.setState({ loading: false });
        this.setState({ response });
      };
      const item = getFieldValueByName('item');
      const location = getFieldValueByName('pickup_location');
      const date = getFieldValueByName('not_needed_after').replace(/-/g, '');

      this.setState({ loading: true });

      placeHold({
        datastoreUid,
        recordId,
        item,
        location,
        date,
        callback
      });
    }
  };

  renderResponse = () => {
    const { response } = this.state;

    if (response) {
      if (response.status === 'Action Succeeded') {
        return (
          <Alert type='success'>
            <h4>You have successfully requested this item</h4>
            <ul className='u-margin-bottom-1 margin-left-2'>
              <li>We will email you when it is available for pickup.</li>
              <li>When it is available, we'll hold it for you for 7 days.</li>
            </ul>
            <Anchor href='https://account.lib.umich.edu/pending-requests/u-m-library'>View all your holds</Anchor>
          </Alert>
        );
      } else {
        return (
          <Alert type='warning'>
            <h4>The hold/request could not be placed</h4>
            <p><span className='strong'>Status:</span> {response.status}</p>
            <p className='u-margin-bottom-none'>Please contact the Graduate Library Circulation Desk at <Anchor href='mailto:circservices@umich.edu'>circservices@umich.edu</Anchor> or <Anchor href='tel:7347640401'>(734) 764-0401</Anchor> for assistance.</p>
          </Alert>
        );
      }
    }

    return null;
  };

  render () {
    const { form } = this.props;
    const { fields, loading, response } = this.state;
    const showForm = !response || response.status !== 'Action Succeeded';

    if (!form) {
      return (
        <Alert type='warning'>
          <p><span className='strong'>Error:</span> Unable to fetch details.</p>
        </Alert>
      );
    }

    return (
      <>
        {this.renderResponse()}
        {showForm && (
          <form action={form.action} method={form.method} onSubmit={this.handleSubmit}>
            {fields.map((field, key) => {
              return (
                <Field field={field} key={key} setFieldChange={this.setFieldChange} loading={loading} />
              );
            })}
          </form>
        )}
      </>
    );
  }
}

GetThisForm.propTypes = {
  form: PropTypes.object,
  datastoreUid: PropTypes.string,
  recordId: PropTypes.string
};

function mapStateToProps (state) {
  return {
    recordId: getFieldValue(getField(state.records.record.fields, 'id'))[0],
    datastoreUid: state.datastores.active
  };
}

export default connect(mapStateToProps)(GetThisForm);
