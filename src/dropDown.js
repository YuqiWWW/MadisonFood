import React from 'react'
import styles from './mystyle.module.css';

class DropDown extends React.Component {
    render() {
        return (<select className={styles.selectcss} placeholder="Select something..." onChange={this.props.filter}>
            <option value="restaurant">Retaurant</option>
            <option value="meal takeaway">Takeaway</option>
            <option value="meal delivery">Delivery</option>
            <option value="bar">Bar</option>
        </select>)
    }
}

export default DropDown