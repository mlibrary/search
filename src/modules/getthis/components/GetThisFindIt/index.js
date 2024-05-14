import React from 'react';
import './styles.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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

const Cell = ({ icon, href, html, text }) => {
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
  icon: PropTypes.string,
  href: PropTypes.string,
  html: PropTypes.string,
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
    notes,
    captionLink,
    headings,
    rows,
    name
  } = holding[0];

  return (
    <>
      <p className='u-margin-top-none'>Use this information to find it:</p>
      <div className='get-this-resource-access-container'>
        <figure>
          <Expandable>
            {caption && (
              <figcaption>
                <span
                  style={{ fontWeight: '600' }}
                  className='margin-right__m'
                >
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
                    {notes.map((note, n) => {
                      return <li key={n}>{note}</li>;
                    })}
                  </ul>
                )}
              </figcaption>
            )}
            <table>
              <thead>
                <tr>
                  {headings.map((heading, i) => {
                    return <th scope='col' key={i}>{heading}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.length <= 2
                  ? (
                    <>
                      {rows.map((row, i) => {
                        return (
                          <tr key={i}>
                            {row.map((cell, t) => {
                              return (
                                <td key={t} className={cell.intent && `intent__${[cell.intent]}`}>
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
                        {rows[0].map((cell, t) => {
                          return (
                            <td key={t} className={cell.intent && `intent__${[cell.intent]}`}>
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
                        {rows.slice(1).map((row, i) => {
                          return (
                            <tr key={i}>
                              {row.map((cell, t) => {
                                return (
                                  <td key={t} className={cell.intent && `intent__${[cell.intent]}`}>
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
