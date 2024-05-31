import './styles.css';
import {
  Anchor,
  Expandable,
  ExpandableButton,
  ExpandableChildren,
  ExpandableProvider,
  Icon,
  TruncateText
} from '../../../reusable';
import getHoldingByBarcode from '../../getHoldingByBarcode';
import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Cell = ({ href, html, icon, text }) => {
  return (
    <>
      {icon && (
        <Icon
          icon={icon}
          className='margin-right__2xs'
          style={{ marginTop: '-2px' }}
        />
      )}
      {href && <Anchor href={href}>{text}</Anchor>}
      {html && <span dangerouslySetInnerHTML={{ __html: html }} />}
      {!href && !html && <TruncateText text={text} />}
    </>
  );
};

Cell.propTypes = {
  href: PropTypes.string,
  html: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string
};

const GetThisFindIt = () => {
  const { barcode } = useParams();
  const resourceAccess = useSelector((state) => {
    return state.records.record?.resourceAccess;
  });

  if (!resourceAccess) {
    return null;
  }

  const holding = getHoldingByBarcode(resourceAccess, barcode);

  if (!holding) {
    return null;
  }

  const {
    caption,
    captionLink,
    headings,
    name,
    notes,
    rows
  } = [holding];

  return (
    <>
      <p className='u-margin-top-none'>Use this information to find it:</p>
      <div className='get-this-resource-access-container'>
        <figure>
          <Expandable>
            {caption && (
              <figcaption>
                <span className='margin-right__m strong'>
                  {caption}
                </span>
                {captionLink && (
                  <Anchor
                    href={captionLink.href}
                    className='font-small'
                  >
                    {captionLink.text}
                  </Anchor>
                )}
                {notes && (
                  <ul className='notes-list'>
                    {notes.map((note, index) => {
                      return <li key={index}>{note}</li>;
                    })}
                  </ul>
                )}
              </figcaption>
            )}
            <table>
              <thead>
                <tr>
                  {headings.map((heading, index) => {
                    return <th scope='col' key={index}>{heading}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.length <= 2
                  ? (
                    <>
                      {rows.map((row, index) => {
                        return (
                          <tr key={index}>
                            {row.map((cell, num) => {
                              return (
                                <td key={num} className={cell.intent ? `intent__${[cell.intent]}` : ''}>
                                  <Cell {...cell} />
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </>
                    )
                  : (
                    <>
                      <tr>
                        {rows[0].map((cell, index) => {
                          return (
                            <td key={index} className={cell.intent ? `intent__${[cell.intent]}` : ''}>
                              <Cell {...cell} />
                            </td>
                          );
                        })}
                      </tr>
                      {rows.length > 6 && (
                        <tr>
                          <td colSpan={`${headings.length}`}>
                            <ExpandableButton count={rows.length} name={name} />
                          </td>
                        </tr>
                      )}
                      <ExpandableChildren show={0}>
                        {rows.slice(1).map((row, index) => {
                          return (
                            <tr key={index}>
                              {row.map((cell, num) => {
                                return (
                                  <td key={num} className={cell.intent ? `intent__${[cell.intent]}` : ''}>
                                    <Cell {...cell} />
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </ExpandableChildren>
                      <ExpandableProvider>
                        {(context) => {
                          return (context.expanded || rows.length <= 6) && (
                            <tr>
                              <td colSpan={headings.length.toString()}>
                                <ExpandableButton count={rows.length} name={name} />
                              </td>
                            </tr>
                          );
                        }}
                      </ExpandableProvider>
                    </>
                    )}
              </tbody>
            </table>
          </Expandable>
        </figure>
      </div>
    </>
  );
};

export default GetThisFindIt;
