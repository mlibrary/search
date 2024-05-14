import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
  const profile = useSelector((state) => {
    return state.profile;
  });
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
      icon: 'link'
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
                      props.setActive(!isActive ? action : undefined);
                      setAlert(null);
                    }}
                    aria-pressed={!!isActive}
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
                {...props}
              />
            </AuthenticationRequired>
          )}
          {props.active?.action === 'text' && (
            <AuthenticationRequired profile={profile}>
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

export default ActionsList;
