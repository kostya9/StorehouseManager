import React, {Component} from 'react'

import css from './AreaDetails.css'

import AreaTypeSelect from './AreaTypeSelect'

export default class AreaDetails extends Component {

  initState(from) {
      this.setState({...this.state, showName: from.name, type: from.type, temperature: from.temperature, humidity: from.humidity})
  }

  componentWillMount() {
    this.initState(this.props);
  }

  componentWillReceiveProps(next) {
    this.initState(next);
  }

  onChange(e) {
    this.setState({ ...this.props, showName: e.target.value})
  }

  onTypeChange(e) {
    this.setState({ ...this.props, type: e.target.value})
  }

  onHumidityChange(e) {
      this.setState({ ...this.props, humidity: e.target.value})
  }

  onTemperatureChange(e) {
      this.setState({ ...this.props, temperature: e.target.value})
  }

  onButtonClick(e) {
    e.preventDefault();
    this.props.updateArea(this.props.id, this.state.showName, this.state.type, this.state.temperature, this.state.humidity);
  }

  onButtonClickRemove(e) {
    e.preventDefault();
    this.props.removeArea(this.props.id);
  }

  render() {
    return (<form>
      <h2>Selected Area</h2>
    <hr />
      <div className="form-group row">
        <label htmlFor="id" className="col-xs-2 col-form-label">Id</label>
        <div className="col-xs-10">
          <input className="form-control" type="number" value={this.props.id} id="id" readOnly/>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="name" className="col-xs-2 col-form-label">Name</label>
        <div className="col-xs-10">
          <input className="form-control" type="text" id="name" value={this.state.showName} onChange={(e) => this.onChange(e)}/>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="type" className="col-xs-2 col-form-label">Type</label>
        <div className="col-xs-10">
          <AreaTypeSelect onChange={(e) => this.onTypeChange(e)} value={this.state.type} areaTypesAvailability={this.props.areaTypesAvailability}/>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="temperature" className="col-xs-2 col-form-label">Temperature</label>
        <div className="col-xs-10">
          <input className="form-control" type="text" id="temperature" value={this.state.temperature} onChange={(e) => this.onTemperatureChange(e)}/>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="humidity" className="col-xs-2 col-form-label">Humidity</label>
        <div className="col-xs-10">
          <input className="form-control" type="text" id="humidity" value={this.state.humidity} onChange={(e) => this.onHumidityChange(e)}/>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={(e) => this.onButtonClick(e)}>Update</button>
      <button className="btn btn-danger area-details-btn" onClick={(e) => this.onButtonClickRemove(e)}>Remove</button>
      <button className="btn btn-default area-details-btn" onClick={(e) => this.onReset(e)}>Reset</button>
    </form>)
  }

    onReset(e) {
        e.preventDefault();
        this.props.reset();
    }
}
