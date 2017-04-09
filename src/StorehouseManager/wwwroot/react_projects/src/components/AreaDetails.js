import React, {Component} from 'react'

import css from './AreaDetails.css'

export default class AreaDetails extends Component {

  componentWillMount() {
    this.setState({...this.state, showName: this.props.name})
  }

  componentWillReceiveProps(next) {
    this.setState({...this.state, showName: next.name})
  }

  onChange(e) {
    this.setState({ ...this.props, showName: e.target.value})
  }

  onButtonClick(e) {
    e.preventDefault();
    this.props.setName(this.state.showName);
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
      <button type="submit" className="btn btn-primary" onClick={(e) => this.onButtonClick(e)}>Update</button>
      <button className="btn btn-danger" onClick={(e) => this.onButtonClickRemove(e)}>Remove</button>
    </form>)
  }
}
