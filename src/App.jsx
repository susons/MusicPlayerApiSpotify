import React, { Component } from 'react';
import './App.css'
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import Profile from './profile'
import Gallery from './Gallery'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';    
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    let accessToken = 'BQCFFqVPUqMFn1DnO08aac1gOwlJhmdAgfpcqR7cPdItv71VUz26G24Mpi-p2xAx1dbpEw5rnx3xZ6x5rk9w8tHSZCwUSSUuwzcA4z4ZiucG_ihpBjtAb2FzKv9h1dXS1IjSNQiwUy2hzT7afWNDoJnGcvTMXYq0NSx5YKPYKEiVxw_KLXqgezysVtonf9SCSIu2-ueiOdJ5BzYX1n34bg-L2lDCzMoAecyfzY5Orz5gCRld4T2hW41uk487RUen0b66-t_cOgiHUulU'
    let accessToken1 = 'BQCfJUl_bICRq2QZ5WHqKFE-wlMLArfGFRGvWORJzZ2ZUcKTSB9N-fXY4pHs20Yo5JgS9OebHVFkrIDRNQKafsvWJYrRr8vIRbKQQKXe0y_hViDmEyxxAJMZKFhV319eRx9VRc4_lW0Y_UQYhMoSSkiqMet0nVnQpkdrn4DzF4ALPYicxDWTpEkZ7tC48qIXo95E-GWPEGWg6KnFY4yCtGKUta_MWygaQqKgr8koH7EYEB53XpoiDj8pjkiZec741ylDSUDdSaLiQrbs'

    var myOptions = {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    var myOptions1 = {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + accessToken1
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions )
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({artist});
    FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=ES&`
    fetch(FETCH_URL, myOptions1)
      .then(response => response.json())
      .then(json => {
        const { tracks } = json;
        this.setState({tracks});
      })
    });
    }

  render() {
    return (
      <div className='App'>
        <div className='appTitle'> Music Blaster</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type='text'
              placeholder='Search for an artist'
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => { if(event.key === 'Enter'){this.search()}}}

            />
            <button onClick={()=>this.search()}>Submit</button>
          </InputGroup>
        </FormGroup>
        { this.state.artist !== null ?
          <div className='profile'>
            <Profile artist={this.state.artist} />
          </div>
          : ''
        }
        <Gallery tracks={this.state.tracks} />
      </div>
    )
  }
}

export default App;