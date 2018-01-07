import React, { Component } from 'react';
import InnerForm from './innerForm';
import _ from 'lodash';

class MasterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clones: [{ id: 0, data: { address1:'test' } }]
        }

        this.generateForms = this.generateForms.bind(this);
        this.deleteForm = this.deleteForm.bind(this);
        this.cloneForm = this.cloneForm.bind(this);
        this.updateParentForm = this.updateParentForm.bind(this);
    }

    generateForms() {
        var forms = [];

        _.each(this.state.clones, (clone, id) => {
            console.log(this.state.clones[id].data);
            forms = _.concat(forms, <InnerForm updateParentForm={this.updateParentForm} 
                                        deleteForm={this.deleteForm}
                                        data={this.state.clones[id].data} 
                                        id={id} 
                                        key={id} />);
        });

        return forms;
    }

    deleteForm(id) {
        var currentClones = this.state.clones;
        currentClones = _.remove(currentClones, (clone) => {
            return clone.id !== id;
        });
        
        _.each(currentClones, (clone, i) => {
            clone.id = i;
        });

        this.setState({
            clones: currentClones
        });
    }

    cloneForm(e) {
        e.preventDefault();
        if(this.state.clones.length > 0) {
            const clonedData = this.state.clones[this.state.clones.length - 1].data;
            let clone = { id: (this.state.clones.length), data: clonedData, errors:[] };
            let { clones } = this.state;
            clones = _.concat(clones, clone);
            this.setState({
                clones
            });
        }
    }

    updateParentForm(id, form) {
        var currentClones = this.state.clones;
        currentClones[id].data = form;
        this.setState({
            clones: currentClones
        });
    }

    render() {
        return(
            <div style={ { width:"100%", display:'flex',alignItems:'center',justifyContent:'center',flexFlow:'column' } }>
                <p>Forms available below</p>
                {this.generateForms()}
                <div onClick={this.cloneForm} className="btn btn-primary">Clone</div>
            </div>
        );
    }
}

export default MasterForm;