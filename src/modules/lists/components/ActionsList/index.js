import React, { useState } from 'react';
import { connect } from 'react-redux';
import EmailAction from '../EmailAction';
import TextAction from '../TextAction';
import FileAction from '../FileAction';
import PermalinkAction from '../PermalinkAction';
import CitationAction from '../CitationAction';
import { AuthenticationRequired } from '../../../profile';
import { ContextProvider, Icon, Alert } from '../../../reusable';
import PropTypes from 'prop-types';

function ActionsList (props) {
  const [alert, setAlert] = useState(null);
  const actions = [
    {
      uid: 'email',
      action: 'email',
      name: 'Email',
      icon: 'email'
    },
    {
      uid: 'text',
      action: 'text',
      name: 'Text',
      icon: 'chat'
    },
    {
      uid: 'citation',
      action: 'citation',
      name: 'Citation',
      icon: 'format_quote'
    },
    {
      uid: 'endnote',
      action: 'file',
      name: 'Export Citation (EndNote)',
      icon: 'insert_drive_file'
    },
    {
      uid: 'ris',
      action: 'file',
      name: 'Export Citation (RIS)',
      icon: 'insert_drive_file'
    },
    {
      uid: 'permalink',
      action: 'permalink',
      name: 'Copy link',
      icon_d: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z'
    }
  ];

  return (
    <ContextProvider render={(data) => {
      return (
        <div className='y-spacing'>
          <ul className='lists-actions-list'>
            {actions.map((action) => {
              if (action.uid === 'permalink' && data.viewType !== 'Full') {
                return null;
              }

              const isActive = action.uid === props.active?.uid;
              const activeClassName = isActive ? 'lists-action-button--active' : '';

              return (
                <li key={action.uid}>
                  <button
                    className={`button-link lists-action-button ${activeClassName}`}
                    onClick={() => {
                      // Click to toggle active state
                      props.setActive(!isActive ? action : undefined);
                      setAlert(null);
                    }}
                    aria-pressed={!!isActive}
                  >
                    <span style={{ opacity: '0.75' }}>
                      <Icon size={20} d={action.icon_d} icon={action.icon} />
                    </span>{action.name}
                  </button>
                </li>
              );
            })}
          </ul>
          {props.active?.action === 'email' && (
            <AuthenticationRequired>
              <EmailAction
                action={props.active}
                {...props}
              />
            </AuthenticationRequired>
          )}
          {props.active?.action === 'text' && (
            <AuthenticationRequired>
              <TextAction
                action={props.active}
                {...props}
              />
            </AuthenticationRequired>
          )}
          {props.active?.action === 'permalink' && (
            <PermalinkAction
              action={props.active}
              setAlert={setAlert}
              {...props}
            />
          )}
          {props.active?.action === 'citation' && (
            <CitationAction
              {...data}
              action={props.active}
              setAlert={setAlert}
              {...props}
            />
          )}
          {props.active?.action === 'file' && (
            <FileAction
              action={props.active}
              {...props}
            />
          )}
          {alert && (
            <Alert type={alert.intent}>{alert.text}</Alert>
          )}
        </div>
      );
    }}
    />
  );
}

ActionsList.propTypes = {
  active: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  setActive: PropTypes.func
};

function mapStateToProps (state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(ActionsList);
