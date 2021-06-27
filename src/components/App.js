import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    console.log('PROPS', this.props);
    return <div></div>;
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
  };
}

export default connect(mapStateToProps)(App);
