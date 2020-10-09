import React from 'react';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom'
import {getArtistsThunk} from './store/artists'
import {getLastfmProfileThunk} from './store/getlastfm'
import {getDiscogsReleasesThunk} from './store/discogs';



class Artists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventLink: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({...this.state, eventLink: event.target.value})
  }

  handleSubmit(event) {
    this.props.getArtists(this.state.eventLink.toString());
    event.preventDefault();
  }

  render() {
    const artist = this.props.artists;
    console.log(this.props);
      return (
        <div>
          <div classsName='artists-container'>
            <form onSubmit={this.handleSubmit}>
              <label>Enter Event URL Here:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
            {(artist.length === 0) ? (<div></div>) :
            (<div>
              <h3>Artists:</h3>
                {artist.map((el, index) => (
                  <div key={index}>
                    <h4>{el}</h4>
                    <Link name={el} to={`/moreinfo/${el}`} onClick={(event) => {
                      this.props.getLastfmProfile(event.target.name)
                      this.props.getDiscogsReleases(event.target.name)
                      }}>About</Link>
                  </div>
                ))}
            </div>)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  artists: state.artists
})

const mapDispatchToProps = dispatch => ({
  getArtists: (url) => {
    dispatch(getArtistsThunk(url))
  },
  getLastfmProfile: (artist) => {
    dispatch(getLastfmProfileThunk(artist))
  },
  getDiscogsReleases: (artist) => {
    dispatch(getDiscogsReleasesThunk(artist))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Artists);
