import React, { Component } from 'react';
import styles from './CalendarTypeMenu.module.css'
import { TypeMenuItem } from './TypeMenuItem'
//jlkj
export class CalendarTypeMenu extends Component {

    state = {       
        TypeMenuItems: [
            { id: 0, name: 'When is good', selected: true },
            { id: 1, name: 'Heat map', selected: false },
            { id: 2, name: 'MVP', selected: false }
        ],
        test: false
    }

    handleItemSelect = (ItemID) => {
        console.log("handleItemSelect")
        for (let i = 0; i < this.state.TypeMenuItems.length; i++) {
            console.log("flag 1:" + i)
            this.state.TypeMenuItems[i].selected = false
        }
        console.log("flag 2")
        this.state.TypeMenuItems[ItemID].selected = true
        console.log(this.state.TypeMenuItems)
        this.setState({ TypeMenuItem: this.state.TypeMenuItems })
    };

    render() {

        return (
            <span className={styles.typeMenu}>
                <h4 className={styles.typeMenuHeader}>Calendar Types</h4>
                <div>
                    {this.state.TypeMenuItems.map(TypeMenuItems =>
                        <TypeMenuItem key={TypeMenuItems.id} name={TypeMenuItems.name}
                            selected={TypeMenuItems.selected} onClick={() => this.handleItemSelect(TypeMenuItems.id)} />
                    )}
                </div>
            </span>
        );
    }


}




