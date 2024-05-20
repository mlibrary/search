import { Alert, ContextProvider, Icon } from '../../../reusable';
import React, { useState } from 'react';
import { AuthenticationRequired } from '../../../profile';
import CitationAction from '../CitationAction';
import EmailAction from '../EmailAction';
import FileAction from '../FileAction';
import PermalinkAction from '../PermalinkAction';
import PropTypes from 'prop-types';
import TextAction from '../TextAction';
import { useSelector } from 'react-redux';

const actions = [
  {
    action: 'email',
    icon: 'email',
    name: 'Email',
    uid: 'email'
  },
  {
    action: 'text',
    icon: 'chat',
    name: 'Text',
    uid: 'text'
  },
  {
    action: 'citation',
    icon: 'format_quote',
    name: 'Citation',
    uid: 'citation'
  },
  {
    action: 'file',
    icon: 'insert_drive_file',
    name: 'Export Citation (EndNote)',
    uid: 'endnote'
  },
  {
    action: 'file',
    icon: 'insert_drive_file',
    name: 'Export Citation (RIS)',
    uid: 'ris'
  },
  {
    action: 'permalink',
    icon: 'link',
    name: 'Copy link',
    uid: 'permalink'
  }
];

const ActionsList = (props) => {
  const [alert, setAlert] = useState(null);
  const profile = useSelector((state) => {
    return state.profile;
  });

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
                      props.setActive(isActive ? null : action);
                      setAlert(null);
                    }}
                    aria-pressed={Boolean(isActive)}
                  >
                    <span style={{ opacity: '0.75' }}>
                      <Icon size={20} icon={action.icon} />
                    </span>
                    {action.name}
                  </button>
                </li>
              );
            })}
          </ul>
          {props.active?.action === 'email' && (
            <AuthenticationRequired profile={profile}>
              <EmailAction
                action={props.active}
                emailAddress={profile?.email || ''}
                {...props}
              />
            </AuthenticationRequired>
          )}
          {props.active?.action === 'text' && (
            <AuthenticationRequired profile={profile}>
              <TextAction
                action={props.active}
                phoneNumber={profile?.text || ''}
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
};

ActionsList.propTypes = {
  active: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  setActive: PropTypes.func
};

export default ActionsList;
