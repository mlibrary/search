import React from 'react'
import Autosuggest from 'react-autosuggest';


class FavoriteInputTag extends React.Component {
  state = {
    value: '',
    suggestions: []
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (value) => {
    const { tags } = this.props

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? tags : tags.filter(tag => {
      if (tag.toLowerCase() === inputValue) {
        return false
      }

      return tag.toLowerCase().slice(0, inputLength) === inputValue
    });
  }

  getSuggestionValue = (suggestion) => {
    return suggestion
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
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
    const { htmlId } = this.props
    const { value, suggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      onChange: this.onChange,
      value: value,
      id: htmlId,
      type: 'search'
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
