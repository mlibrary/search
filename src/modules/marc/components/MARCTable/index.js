import React from 'react';
import PropTypes from 'prop-types';

const name = (field) => {
  return Object.keys(field)[0];
};

const FieldValue = ({ field }) => {
  const value = field[name(field)];

  if (typeof value === 'string') {
    return value;
  };

  const { subfields } = value;
  return (
    <>
      {subfields?.map((subfield, index) => {
        const subfieldName = name(subfield);
        return (
          <span className='marc__subfield' key={index}>
            <span className='strong'>|{subfieldName}</span> {subfield[subfieldName]}
          </span>
        );
      })}
    </>
  );
};

FieldValue.propTypes = {
  field: PropTypes.object.isRequired
};

function MARCTable ({ marc }) {
  return (
    <div className='marc__container'>
      <h2 className='marc__heading'>MARC Data</h2>
      <table className='table marc__table'>
        <tbody>
          {marc.leader && (
            <tr>
              <td className='marc__field-name' colSpan='3'><abbr title='LEADER'>LDR</abbr></td>
              <td>{marc.leader}</td>
            </tr>
          )}
          {marc.fields.map((field, index) => {
            const fieldName = name(field);
            return (
              <tr key={index}>
                <td className='marc__field-name'>
                  {fieldName}
                </td>
                {['ind1', 'ind2'].map((indicator) => {
                  return (
                    <td key={`${indicator}-${index}`}>
                      {field[fieldName][indicator]}
                    </td>
                  );
                })}
                <td>
                  <FieldValue field={field} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

MARCTable.propTypes = {
  marc: PropTypes.object
};

export default MARCTable;
