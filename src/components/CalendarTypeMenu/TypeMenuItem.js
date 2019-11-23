import React, { Component } from 'react';
import styles from './CalendarTypeMenu.module.css'

export class TypeMenuItem extends Component {

    state = {
        name: this.props.name,
    }

    getSelectedClasses() {
        let Classes = this.props.selected ? styles.ItemSelected : null;
        return Classes;
    }

    render() {

        return (
            <div className={[this.getSelectedClasses(), styles.Item].join(' ')} onClick={this.props.onClick} > {this.state.name}</div>
        );
    }


}




