import React from 'react'
import styles from './mystyle.module.css';

class DropDown extends React.Component {
    render() {
        return (<select className={styles.selectcss} placeholder="Select something..." onChange={this.props.filter}>
            <option value="restaurant">餐馆</option>
            <option value="meal takeaway">打包</option>
            <option value="meal delivery">外卖</option>
            <option value="bar">酒吧</option>
        </select>)
    }
}

export default DropDown