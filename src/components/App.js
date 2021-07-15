import React from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { TextField, MenuItem, styled } from '@material-ui/core';

import { emd } from '../helper/emd';
import { ems } from '../helper/ems_nov';

const MyTextField = styled(TextField)({
  width: '100%',
});

function getEmsKey(attr) {
  let dates = [];
  for (const date in ems[attr]) {
    dates.push(date);
  }
  return dates;
}

function getEmsValue(attr) {
  let values = [];
  for (const date in ems[attr]) {
    values.push(ems[attr][date]);
  }
  return values;
}

function getKey() {
  let times = [];
  for (const obj of emd) {
    times.push(obj.Time);
  }
  return times;
}

function getValue(attr) {
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
      dataType: '',
      attribute: '',
    };
  }

  handleInputChange = (field, value) => {
    this.setState({
      ...this.state,
      [field]: value,
    });
  };

  render() {
    const attr = this.state.attribute;
    const data_opts = ['ems', 'emd'];
    const com_opts =
      this.state.dataType === 'emd'
        ? ['PM1', 'PM2.5', 'PM10', 'NO2', 'CO2', 'CO', 'Hum', 'Temp']
        : ['Nitrogen Dioxide', 'Carbon Monoxide'];
    const ems_data = {
      labels: getEmsKey(attr),
      datasets: [
        {
          label: attr,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(75,192,192,1)',
          // borderWidth: 2,
          data: getEmsValue(attr),
        },
      ],
    };
    const emd_data = {
      labels: getKey(),
      datasets: [
        {
          label: attr,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2,
          data: getValue(attr),
        },
      ],
    };
    return (
      <div className="App">
        <form className="form">
          <div className="input-field">
            <MyTextField
              select
              label="Data"
              value={this.state.dataType}
              onChange={(e) =>
                this.handleInputChange('dataType', e.target.value)
              }
              helperText="Select Data"
              variant="outlined"
            >
              {data_opts.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </MyTextField>
          </div>
          <div className="input-field">
            <MyTextField
              select
              label="Component"
              value={attr}
              onChange={(e) =>
                this.handleInputChange('attribute', e.target.value)
              }
              helperText="Select component"
              variant="outlined"
            >
              {com_opts.map((option) => (
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
            <Bar data={this.state.dataType === 'emd' ? emd_data : ems_data} />
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
