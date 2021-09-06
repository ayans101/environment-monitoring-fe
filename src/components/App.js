import React from 'react';
import { connect } from 'react-redux';

import Air from './Air.js';
import Weather from './Weather.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherOrAqm: 1,
    };
  }

  render() {
    return (
      <div className="App">
        <div className="side-nav">
          <div
            className="side-nav-row"
            onClick={() => {
              this.setState({ weatherOrAqm: 0 });
            }}
            style={
              this.state.weatherOrAqm === 0
                ? { backgroundColor: 'rgba(75, 192, 192, 1)' }
                : {}
            }
          >
            Weather
          </div>
          <div
            className="side-nav-row"
            onClick={() => {
              this.setState({ weatherOrAqm: 1 });
            }}
            style={
              this.state.weatherOrAqm === 1
                ? { backgroundColor: 'rgba(75, 192, 192, 1)' }
                : {}
            }
          >
            Air
          </div>
        </div>
        {this.state.weatherOrAqm === 0 ? <Weather /> : <Air />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
  };
}

export default connect(mapStateToProps)(App);
