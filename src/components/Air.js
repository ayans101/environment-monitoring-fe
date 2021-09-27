import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { TextField, styled, Button } from '@material-ui/core';
import PinDropIcon from '@material-ui/icons/PinDrop';

const MyTextField = styled(TextField)({
  width: '100%',
});

function getValue(ems_data, attribute) {
  let list = [];
  if (!ems_data) {
    return list;
  }
  for (const obj of ems_data) {
    if (attribute === 'date') {
      list.push(obj[attribute].substring(11));
    } else {
      list.push(obj[attribute]);
    }
  }
  // console.log(attribute, list);
  return list;
}

function getBar(ems_data, attribute) {
  const data = {
    labels: getValue(ems_data, 'date'),
    datasets: [
      {
        label: attribute,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        // borderWidth: 2,
        data: getValue(ems_data, attribute),
      },
    ],
  };
  return data;
}

class Air extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 0,
      date: undefined,
      data: undefined,
    };
  }

  handleInputChange = (field, value) => {
    // console.log(value);
    this.setState({
      ...this.state,
      [field]: value,
    });
  };

  fetchData = async () => {
    const { location, date } = this.state;
    if (!date) {
      window.alert('Choose a date');
      return;
    }
    const url = `http://13.232.132.83:800${location + 1}/get-ems${
      location + 1
    }-data/${date}`;
    console.log(url);
    const response = await fetch(url);
    // console.log(response.status);
    if (response.status === 200) {
      const data = await response.json();
      this.setState({
        data: data,
      });
    } else {
      this.setState({
        data: undefined,
      });
      window.alert('Choose some other date for this location');
    }
  };

  render() {
    // console.log(this.state.data);
    const locations = [
      'EMS-1-Bhiringi, Benachity',
      'EMS-2-Party Office, Benachity',
      'EMS-3-Gopalmath, Durgapur',
      'EMS-4-NITDGP',
      "EMS-5-Shyamal Da's Home, Kabiguru",
      'EMS-6-DIST College, Sepco',
      "EMS-7-Shyamal Da's Office, City Centre",
    ];
    return (
      <div className="aqm">
        <form className="form">
          <div className="map">
            <div
              className="locations"
              onClick={() => this.handleInputChange('location', 0)}
              style={{ top: '100px', left: '180px' }}
            >
              <PinDropIcon />
              EMS-1 <br /> Bhiringi, Benachity
            </div>
            <div
              className="locations"
              onClick={() => this.handleInputChange('location', 1)}
              style={{ top: '150px', left: '240px' }}
            >
              <PinDropIcon />
              EMS-2 <br /> Party Office, Benachity
            </div>
            <div
              className="locations"
              onClick={() => this.handleInputChange('location', 2)}
              style={{ top: '20px', left: '40px' }}
            >
              <PinDropIcon />
              EMS-3
              <br />
              Gopalmath, Durgapur
            </div>
            <div
              className="locations"
              onClick={() => this.handleInputChange('location', 3)}
              style={{ top: '110px', left: '230px' }}
            >
              <PinDropIcon />
              EMS-4
              <br />
              NITDGP
            </div>
            <div
              className="locations"
              onClick={() => this.handleInputChange('location', 4)}
              style={{ top: '130px', left: '250px' }}
            >
              <PinDropIcon />
              EMS-5
              <br />
              Shyamal Da's Home, Kabiguru
            </div>
            <div
              className="locations"
              onClick={() => this.handleInputChange('location', 5)}
              style={{ top: '100px', left: '290px' }}
            >
              <PinDropIcon />
              EMS-6
              <br />
              DIST College, Sepco
            </div>
            <div
              className="locations"
              onClick={() => this.handleInputChange('location', 6)}
              style={{ top: '140px', left: '260px' }}
            >
              <PinDropIcon />
              EMS-7
              <br />
              Shyamal Da's Office, City Centre
            </div>{' '}
          </div>
          <div className="location-id">
            Location: <br />
            {locations[this.state.location]}
            {/* <MyTextField
              select
              label="Choose location"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={this.state.location}
              onChange={(e) =>
                this.handleInputChange('location', e.target.value)
              }
            >
              {locations.map((option, idx) => (
                <MenuItem key={idx} value={idx}>
                  {option}
                </MenuItem>
              ))}
            </MyTextField> */}
          </div>
          <div className="fields">
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
            <div className="input-field">
              <Button
                variant="contained"
                color="primary"
                onClick={this.fetchData}
              >
                Fetch
              </Button>
            </div>
          </div>
        </form>
        <div className="bars">
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'co')} />
          </div>
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'humidity')} />
          </div>
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'no2')} />
          </div>
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'pm10')} />
          </div>
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'pm2_5')} />
          </div>
          <div className="bar-graph">
            <Bar data={getBar(this.state.data, 'temp')} />
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

export default connect(mapStateToProps)(Air);
