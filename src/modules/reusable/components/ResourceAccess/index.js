import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Expandable,
  ExpandableProvider,
  ExpandableChildren,
  ExpandableButton
} from '../../../reusable';
import styled from '@emotion/styled';
import {
  SEARCH_COLORS,
  INTENT_COLORS,
  MEDIA_QUERIES
} from '../../../reusable/umich-lib-core-temp';

const FigureStyled = styled('figure')({
  overflowX: 'auto',
  overflowY: 'visible',
  margin: 0,
  padding: 0,
  'tr:not(:last-child)': {
    borderBottom: `solid 1px ${SEARCH_COLORS.grey[400]}`
  }
});

const FigCaptionStyled = styled('figcaption')({
  [MEDIA_QUERIES.LARGESCREEN]: {
    display: 'flex',
    alignItems: 'baseline',
    flexWrap: 'wrap'
  }
});

const FigCaptionContentStyled = styled('div')({

});

const NotesListStyled = styled('ul')({
  fontSize: '0.875rem',
  margin: 0,
  padding: 0,
  listStyle: 'none'
});

const StyledTH = styled('th')({
  fontSize: '0.875rem',
  color: SEARCH_COLORS.grey[600],
  borderBottom: `solid 2px ${SEARCH_COLORS.grey[400]}`
});

const td_and_th = {
  padding: '0.5rem 0',
  textAlign: 'left',
  verticalAlign: 'top',
  '&:not(:last-child)': {
    paddingRight: '1rem'
  }
};

const TableStyled = styled('table')({
  borderCollapse: 'collapse',
  borderSpacing: '0',
  width: '100%',
  minWidth: '30rem',
  tableLayout: 'fixed',
  tbody: {
    'tr:not(:last-child)': {
      borderBottom: `solid 1px ${SEARCH_COLORS.grey[400]}`
    }
  },
  td: td_and_th,
  th: td_and_th
});

class TrimCellText extends React.Component {
  state = {
    expanded: false,
    trimTextAt: 120
  };

  render () {
    const { text } = this.props;
    const { trimTextAt } = this.state;

    // When text doens't need to be trimmed.
    // Only trimming past trim text at, so user don't show all
    // for just a few more chars.
    if (text.length <= trimTextAt + 60) {
      return (
        <>{text}</>
      );
    }

    // When text is longer than the trim text at length.
    const isExpanded = this.state.expanded;
    const buttonText = isExpanded ? 'Show less' : 'Show more';
    const displayText = isExpanded ? text : `${text.substr(0, trimTextAt)}...`;
    return (
      <>
        <span style={{ paddingRight: '0.25rem' }}>{displayText}</span>
        <Button
          kind='secondary'
          small
          aria-expanded={isExpanded}
          onClick={() => {
            return this.setState({ expanded: !isExpanded });
          }}
        >{buttonText}
        </Button>
      </>
    );
  }
}

const Cell = ({
  cell,
  renderAnchor
}) => {
  return (
    <>
      {cell.icon && (
        <Icon
          icon={cell.icon}
          style={{
            marginRight: '0.25rem',
            marginTop: '-2px'
          }}
        />)}

      {(() => {
        if (cell.href) {
          return (<a href={cell.href}>{cell.text}</a>);
        }
        if (cell.to) {
          return (renderAnchor(cell));
        }
        if (cell.html) {
          return <span dangerouslySetInnerHTML={{ __html: cell.html }} />;
        }
        return (<TrimCellText text={cell.text} />);
      })()}
    </>
  );
};

/**
  Use this component to provide a comprehensive listing of options to access a resource.
*/
class ResourceAccess extends React.Component {
  render () {
    const {
      caption,
      notes,
      captionLink,
      headings,
      rows,
      name,
      renderAnchor
    } = this.props;

    return (
      <FigureStyled>
        <Expandable>
          <FigCaptionStyled>
            {caption && (
              <FigCaptionContentStyled className='x-spacing'>
                <span style={{ fontWeight: '600' }}>{caption}</span>
                {captionLink && (
                  <a
                    href={captionLink.href} style={{
                      fontSize: '0.875rem'
                    }}
                  >{captionLink.text}
                  </a>
                )}
                {notes && (
                  <NotesListStyled>
                    {notes.map((note, n) => {
                      return <li key={n}>{note}</li>;
                    })}
                  </NotesListStyled>
                )}
              </FigCaptionContentStyled>
            )}
          </FigCaptionStyled>
          <TableStyled>
            <thead>
              <tr>
                {headings.map((heading, i) => {
                  return (
                    <StyledTH scope='col' key={i}>{heading}</StyledTH>
                  );
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
                              <td key={t} style={{ color: `${INTENT_COLORS[cell.intent]}` }}>
                                <Cell cell={cell} renderAnchor={renderAnchor} />
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
                          <td key={t} style={{ color: `${INTENT_COLORS[cell.intent]}` }}>
                            <Cell cell={cell} renderAnchor={renderAnchor} />
                          </td>
                        );
                      })}
                    </tr>
                    {rows.length > 6 && (
                      <tr>
                        <td colSpan={`${headings.length}`}>
                          <ExpandableButton kind='secondary' small count={rows.length} name={name} />
                        </td>
                      </tr>
                    )}
                    <ExpandableChildren show={0}>
                      {rows.slice(1).map((row, i) => {
                        return (
                          <tr key={i}>
                            {row.map((cell, t) => {
                              return (
                                <td key={t} style={{ color: `${INTENT_COLORS[cell.intent]}` }}>
                  <Cell cell={cell} renderAnchor={renderAnchor} />
                </td>
                              )
                            })}
                          </tr>
                        );
                      })}
                    </ExpandableChildren>
                    <ExpandableProvider>
                      {(context) => {
                        return (
                          <>
                            {(context.expanded || rows.length <= 6)
                              ? (
                <tr>
                                <td colSpan={`${headings.length}`}>
            <ExpandableButton kind='secondary' small count={rows.length} name={name} />
          </td>
                              </tr>
                                )
                              : null}
                          </>
                        );
                      }}
                    </ExpandableProvider>
                  </>
                  )}
            </tbody>
          </TableStyled>
        </Expandable>
      </FigureStyled>
    );
  }
}

ResourceAccess.propTypes = {
  /**
    Table column headings.
  */
  headings: PropTypes.array.isRequired,
  /**
    Table rows must be an array of arrays. Each inner array represent a row and will contain objects for each cell. A cell object must contain a text key with a string value. If you wish the cell to be linked somewhere then include `to` or an `href` key. See `renderAnchor` prop to decide between `to` or `href`.
  */
  rows: PropTypes.array.isRequired,
  /**
    Name used to show all rows.
  */
  name: PropTypes.string,
  /**
    The displayed table caption. If you do not use this prop, make sure the preceding heading is appropriate.
  */
  caption: PropTypes.string,
  /**
    Link to more information about the table caption.
  */
  captionLink: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
  }),
  /**
    Notes necessary to understand the resource access options.
  */
  notes: PropTypes.array,
  /** Row cells that use key 'to' instead of 'href' will use this render prop. This is useful if you want to use a routing library such as React Router instead of an HTML anchor. */
  renderAnchor: PropTypes.func
};

export default ResourceAccess;
