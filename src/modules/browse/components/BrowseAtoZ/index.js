import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';

class BrowseAtoZ extends React.Component {
  createBrowseTo = ({ query, filter }) => {
    const {
      match
    } = this.props;

    const queryString = qs.stringify({
      query,
      filter,
      sort: 'title_asc'
    }, {
      arrayFormat: 'repeat',
      encodeValuesOnly: true,
      allowDots: true,
      format: 'RFC1738'
    });

    return `/${match.params.datastoreSlug}?${queryString}`;
  };

  render () {
    return (
      <section className='browse'>
        <h2 className='heading-large' style={{ marginTop: '0' }}>Titles A-Z</h2>
        <ul className='browse-list'>
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map((character, key) => {
            return (
              <li className='browse-item' key={key}>
                <Link
                  className='browse-button'
                  to={this.createBrowseTo({
                    query: 'browse_starts_with:' + character
                  })}
                >
                  {character}
                </Link>
              </li>
            );
          })}
          <li className='browse-item'>
            <Link
              className='browse-button'
              to={this.createBrowseTo({
                query: 'browse_starts_with:0-9'
              })}
            >
              0-9
            </Link>
          </li>
          <li className='browse-item'>
            <Link
              className='browse-button'
              to={this.createBrowseTo({
                query: 'browse_starts_with:Other'
              })}
            >
              Other
            </Link>
          </li>
        </ul>
      </section>
    );
  }
}

BrowseAtoZ.propTypes = {
  match: PropTypes.object
};

// function BrowseAtoZ () {

// }

export default withRouter(BrowseAtoZ);

// class LinkPhoneNumber extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             phoneNumber: null,
//         };
//         this.linkPhoneNumber = this.linkPhoneNumber.bind(this);
//     }
//     componentDidMount() {
//         // Logging the event that component is mount
//         console.log('LinkPhoneNumberComponent is mounted');
//     }
//     linkPhoneNumber() {
//         this.setState({ phoneNumber: '+1 xxx xxx xxxx' });
//     }
//     render() {
//         return <div onClick={this.linkPhoneNumber}> Click Here </div>;
//     }
// }
// export default LinkPhoneNumberPage;

// export const LinkPhoneNumber = () => {
//   // Set the state pf phoneNumber using useState hook
//   const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);

//   useEffect(() => {
//       // Logging the event that component is mount on first render
//       console.log('LinkPhoneNumberComponent is mounted');
//   }, []);

//   // Declare your local functions
//   const linkPhoneNumber = () => {
//       setPhoneNumber('+1 xxx xxx xxxx');
//   };

//   // Return the final component
//   return <div onClick={linkPhoneNumber}> Click Here </div>;
// };
