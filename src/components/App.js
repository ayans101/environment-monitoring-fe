import React from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { TextField, MenuItem, styled } from '@material-ui/core';

import { emd } from '../emd';

const MyTextField = styled(TextField)({
  width: '100%',
});

function getKey() {
  let times = [];
  for (const obj of emd) {
    times.push(obj.Time);
  }
  return times;
}

function getvalue(attr) {
  let list = [];
  for (const obj of emd) {
    list.push(obj[attr]);
  }
  return list;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attribute: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      attribute: e.target.value,
    });
  };

  render() {
    const attr = this.state.attribute;
    const opts = ['PM1', 'PM2.5', 'PM10', 'NO2', 'CO2', 'CO', 'Hum', 'Temp'];
    const data = {
      labels: getKey(),
      datasets: [
        {
          label: attr,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2,
          data: getvalue(attr),
        },
      ],
    };
    return (
      <div className="App">
        <form className="form">
          <div className="input-field">
            <MyTextField
              select
              label="Component"
              value={attr}
              onChange={this.handleChange}
              helperText="Select component"
              variant="outlined"
            >
              {opts.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </MyTextField>
          </div>
        </form>
        <div className="results">
          <div className="graph-title">{attr ? attr : 'component'} vs time</div>
          <div className="bar-graph">
            <Bar data={data} />
          </div>
        </div>
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
