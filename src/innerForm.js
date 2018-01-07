import React, { Component } from 'react';

class InnerForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                address1: ''
            }
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(propertyName, event) {
        const {data} = this.props;

        const newData = Object.assign({}, data, {
            [propertyName]: event
        });

        this.props.updateParentForm(this.props.id, newData);
    }

    render() {
        if(this.props.data === undefined) {
            return (<div>Loading...</div>);
        }

        return(
                <form>
                    <h2 onClick={e => this.props.deleteForm(this.props.id)}>X</h2>
                     <div className="form-group">
                        <label>Address</label>
                        <input onChange={event => this.onInputChange('address1', event.target.value)} value={this.props.data.address1} id={'address1'} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                      </div>
                    <div className="form-group">
                        <label>Address 2</label>
                        <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                    </div>
                </form>
        );
    }
}

export default InnerForm;