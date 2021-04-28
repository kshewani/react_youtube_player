import React from 'react'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
    }
    render() {
        return (
            <div>
                <input
                    className="search-bar"
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)} />
            </div>
        )
    }

    onInputChange(term) {
        this.setState({term}); // this is same as: this.setState({term: term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;