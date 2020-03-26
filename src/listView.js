import React from 'react'
import styles from './mystyle.module.css'

class ListView extends React.Component{
    render() {
        return (
            <div className={styles.column} style={{ backgroundColor: "#fff" }} onMouseOver={(e) => {
                this.props.data.marker.setAnimation(window.google.maps.Animation.BOUNCE);
            }} onMouseLeave={(e) => {
                this.props.data.marker.setAnimation(null);
            }}>
                <h4>{this.props.data.data.name}</h4>
                <p>Type: {this.props.data.data.types.map((item) => item.replace('_', ' ')).join(', ')}</p>
                <p>Ratings: {this.props.data.data.rating} </p>
                {this.props.data.data.photos.map((url) => (
                    <img src={url.getUrl({ maxHeight: 100, maxWidth: 200 })}/> 
                ))}
            </div>
        );
    }
}

export default ListView