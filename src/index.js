import _ from "lodash"
import React, { Component } from 'react';
// const Component = React.Component;
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'

// replace xxx with actual YouTube api key
const API_KEY = 'xxx';

// Create a new component. This component should produce some html
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('BlockChain');
    }
    
    videoSearch(term) {
        YTSearch({ key: API_KEY, term}, (searchedVideos) => {
            this.setState({
                videos: searchedVideos,
                selectedVideo: searchedVideos[0]
            })
        });
    }

    render() {
        const videoSearch = _.debounce(term => { this.videoSearch(term) }, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

// Take this component's generated html and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));

