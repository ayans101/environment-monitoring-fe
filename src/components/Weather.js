import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { TextField, styled } from '@material-ui/core';

const MyTextField = styled(TextField)({
  width: '100%',
});

function getValue(weather_data, attribute) {
  let list = [];
  if (!weather_data) {
    return list;
  }
  for (const obj of weather_data) {
    list.push(obj[attribute]);
  }
  return list;
}

function getBar(weather_data, attribute) {
  const data = {
    labels: [
      '12:00 AM',
      '01:00 AM',
      '02:00 AM',
      '03:00 AM',
      '04:00 AM',
      '05:00 AM',
      '06:00 AM',
      '07:00 AM',
      '08:00 AM',
      '09:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '01:00 PM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
      '05:00 PM',
      '06:00 PM',
      '07:00 PM',
      '08:00 PM',
      '09:00 PM',
      '10:00 PM',
      '11:00 PM',
    ],
    datasets: [
      {
        label: attribute,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        // borderWidth: 2,
        data: getValue(weather_data, attribute),
      },
    ],
  };
  return data;
}

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: undefined,
      data: undefined,
    };
  }

  handleInputChange = async (field, value) => {
    const url = `http://localhost:8000/get-weather-data/${value}`;
    const response = await fetch(url);
    console.log(response.status);
    if (response.status === 200) {
      const data = await response.json();
      this.setState({
        [field]: value,
        data: data,
      });
    } else {
      this.setState({
        [field]: value,
        data: undefined,
      });
      window.alert('Choose some other date');
    }
  };

  render() {
    return (
      <div className="weather">
        <div className="input-field">
          <MyTextField
            type="date"
            label="Enter Date"
            variant="outlined"
            // defaultValue="2017-05-24"
            InputLabelProps={{ shrink: true }}
            value={this.state.date}
            onChange={(e) => this.handleInputChange('date', e.target.value)}
          />
        </div>
        <div className="bars">
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'humidity')} />
          </div>
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'wind_deg')} />
          </div>
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'wind_speed')} />
          </div>
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'clouds')} />
          </div>
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'temp')} />
          </div>
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'temp_feel')} />
          </div>
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'pressure')} />
          </div>
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'dew_point')} />
          </div>
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'uvi')} />
          </div>
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'visibility')} />
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

export default connect(mapStateToProps)(Weather);
