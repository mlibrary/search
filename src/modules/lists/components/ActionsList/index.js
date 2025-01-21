import { Alert, ContextProvider, Icon } from '../../../reusable';
import React, { useState } from 'react';
import CitationAction from '../CitationAction';
import FileAction from '../FileAction';
import PermalinkAction from '../PermalinkAction';
import ShareAction from '../ShareAction';

const actions = [
  {
    action: 'share',
    icon: 'email',
    name: 'Email',
    uid: 'email'
  },
  {
    action: 'share',
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

const ActionsList = ({ active, list, prejudice, record, setActive }) => {
  const [alert, setAlert] = useState(null);
  return (
    <ContextProvider render={(data) => {
      const { datastore: { uid: datastoreUid }, viewType } = data;
      return (
        <div className='y-spacing'>
          <ul className='lists-actions-list'>
            {actions.map((action) => {
              if (action.uid === 'permalink' && viewType !== 'Full') {
                return null;
              }

              const isActive = action.uid === active?.uid;
              const activeClassName = isActive ? 'lists-action-button--active' : '';

              return (
                <li key={action.uid}>
                  <button
                    className={`button-link lists-action-button ${activeClassName}`}
                    onClick={() => {
                      setActive(isActive ? null : action);
                      setAlert(null);
                    }}
                    aria-pressed={Boolean(isActive)}
                  >
                    <Icon size={20} icon={action.icon} className={isActive ? null : 'text-grey'} />
                    {action.name}
                  </button>
                </li>
              );
            })}
          </ul>
          {active?.action === 'share' && <ShareAction {...{ action: active, datastoreUid, prejudice }} />}
          {active?.action === 'citation' && <CitationAction {...{ datastoreUid, list, record, setAlert, viewType }} />}
          {active?.action === 'file' && <FileAction {...{ datastoreUid, prejudice }} />}
          {active?.action === 'permalink' && <PermalinkAction {...{ setActive, setAlert }} />}
          {alert && <Alert {...{ type: alert.intent }}>{alert.text}</Alert>}
        </div>
      );
    }}
    />
  );
};

export default ActionsList;
