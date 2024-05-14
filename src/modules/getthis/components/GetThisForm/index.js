import React, { useState } from 'react';
import { Alert, Anchor } from '../../../reusable';
import { useSelector } from 'react-redux';
import { getField, getFieldValue } from '../../../records/utilities';
import { placeHold } from '../../../pride';
import PropTypes from 'prop-types';

const Field = ({ field, setFieldChange, loading }) => {
  const { type, name, value, options } = field;

  if (type === 'hidden') {
    return <input id={name} type={type} name={name} value={value} onChange={setFieldChange} />;
  }

  if (type === 'select') {
    return (
      <div className='form-group'>
        {field.label && (
          <label className='form-label' htmlFor={field.name}>{field.label}</label>
        )}
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
      </div>
    );
  }

  if (type === 'submit') {
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
      {field.label && <label className='form-label' htmlFor={field.name}>{field.label}</label>}
      <input className='form-control' id={name} type={type} name={name} value={value} onChange={setFieldChange} />
    </div>
  );
};

Field.propTypes = {
  field: PropTypes.object,
  setFieldChange: PropTypes.func,
  loading: PropTypes.bool
};

const GetThisForm = ({ form }) => {
  const [fields, setFields] = useState(form.fields);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const recordId = useSelector((state) => {
    return getFieldValue(getField(state.records.record.fields, 'id'))[0];
  });
  const datastoreUid = useSelector((state) => {
    return state.datastores.active;
  });

  const setFieldChange = (event) => {
    const updatedFields = fields.map((field) => {
      return field.name === event.target.name ? { ...field, value: event.target.value } : field;
    }
    );
    setFields(updatedFields);
  };

  const handleSubmit = (event) => {
    if (form.type === 'ajax' && !loading) {
      event.preventDefault();
      setLoading(true);

      const getFieldValueByName = (name) => {
        return fields.find((field) => {
          return field.name === name;
        })?.value;
      };
      const callback = (response) => {
        setLoading(false);
        setResponse(response);
      };

      placeHold({
        datastoreUid,
        recordId,
        item: getFieldValueByName('item'),
        location: getFieldValueByName('pickup_location'),
        date: getFieldValueByName('not_needed_after')?.replace(/-/g, ''),
        callback
      });
    }
  };

  const renderResponse = () => {
    if (!response) {
      return null;
    }
    const success = response.status === 'Action Succeeded';

    return (
      <Alert type={success ? 'success' : 'warning'}>
        <h4>{success ? 'You have successfully requested this item' : 'The hold/request could not be placed'}</h4>
        {success
          ? (
            <>
              <ul className='u-margin-bottom-1 margin-left-2'>
                <li>We will email you when it is available for pickup.</li>
                <li>When it is available, we&apos;ll hold it for you for 7 days.</li>
              </ul>
              <Anchor href='https://account.lib.umich.edu/pending-requests/u-m-library'>View all your holds</Anchor>
            </>
            )
          : (
            <>
              <p><span className='strong'>Status:</span> {response.status}</p>
              <p className='u-margin-bottom-none'>Please contact the Graduate Library Circulation Desk at <Anchor href='mailto:circservices@umich.edu'>circservices@umich.edu</Anchor> or <Anchor href='tel:7347640401'>(734) 764-0401</Anchor> for assistance.</p>
            </>
            )}
      </Alert>
    );
  };

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
      {renderResponse()}
      {showForm && (
        <form action={form.action} method={form.method} onSubmit={handleSubmit}>
          {fields.map((field, index) => {
            return (
              <Field field={field} key={index} setFieldChange={setFieldChange} loading={loading} />
            );
          })}
        </form>
      )}
    </>
  );
};

GetThisForm.propTypes = {
  form: PropTypes.object
};

export default GetThisForm;
