import React from 'react'
import Autosuggest from 'react-autosuggest';


class FavoriteInputTag extends React.Component {
  state = {
    suggestions: []
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (value) => {
    const { suggestions } = this.props

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? suggestions : suggestions.filter(tag => {
      if (tag.toLowerCase() === inputValue) {
        return false
      }

      return tag.toLowerCase().slice(0, inputLength) === inputValue
    });
  }

  getSuggestionValue = (suggestion) => {
    return suggestion
  }

  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion = (suggestion) => {
    return (
      <React.Fragment>{suggestion}</React.Fragment>
    )
  }

  render() {
    const { htmlId, onChange, value, name } = this.props
    const { suggestions } = this.state

    const inputProps = {
      onChange,
      value,
      id: htmlId,
      type: 'search',
      name
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        alwaysRenderSuggestions={true}
      />
    )
  }

}

export default FavoriteInputTag
