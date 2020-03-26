import React from 'react';
import styles from './mystyle.module.css'
import DropDown from './dropDown'
import ListView from './listView'

let map;
let markersData = [];
// let data = [];

export default class GoogleMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapIsReady: false,
            query: 'food'
        };
    }

    componentDidMount() {
        const ApiKey = 'AIzaSyAJO1-VuV-q9GPnwoazEoYSgab2xDhrHHE';
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${ApiKey}`;
        script.async = true;
        script.defer = true;
        script.addEventListener('load', () => {
            this.setState({ mapIsReady: true });
        });

        document.body.appendChild(script);
    }

    searchPlaces = (q) => {
        var bounds = map.getBounds();
        var placesService = new window.google.maps.places.PlacesService(map);
        placesService.textSearch({
            query: q,
            bounds: bounds
        }, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                // createMarkersForPlaces(results);
                console.log(results);
                // let markers = [];
                for (let i = 0; i < results.length; i++) {
                    let marker = new window.google.maps.Marker({
                        position: results[i].geometry.location,
                        title: results[i].name,
                        animation: window.google.maps.Animation.DROP,
                        id: i
                    });
                    marker.setMap(map);
                    let md = {
                        marker: marker,
                        data: results[i]
                    };
                    markersData.push(md);
                    this.initializeDetails(marker, results[i], md);
                }
            }
        });
    }
    initializeDetails(marker, result, md) {
        let infowindow = new window.google.maps.InfoWindow({
            content: ''
        });
        let content = `<div class="info">${result.name}
                            <p>Type: ${result.types.slice(0, result.types.indexOf(this.state.query) + 1)
                .map((item) => item.replace('_', ' ')).join(', ')}</p>`;
        if (result.opening_hours !== undefined) {
            content += `<p>Opening now? ${result.opening_hours.open_now}</p>`;
        }
        if (result.photos) {
            content += '<br><br><img src="' + result.photos[0].getUrl(
                { maxHeight: 100, maxWidth: 200 }) + '">';
        }
        content += `<p>Ratings: ${result.rating}</p></div>`;
        infowindow.setContent(content);
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
        md.infowindow = infowindow;
    }

    componentDidUpdate = () => {
        if (this.state.mapIsReady) {
            // Display the map
            map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 43.0767822, lng: -89.3904415 },
                zoom: 14,
                mapTypeControl: false
            });
            // You also can add markers on the map below
            this.searchPlaces('food');
            this.setState({mapIsReady: false}); // such that only one-time map init
        }
    }

    handleFilter = (e) => {
        let filter = e.target.value;
        for (let i = 0; i < markersData.length; i++) {
            if (markersData[i].data.types.filter((item) => item.replace('_', ' ') == filter).length === 0) {
                markersData[i].marker.setMap(null);
            } else {
                markersData[i].marker.setMap(map);
            }
        }
        this.setState({query: filter});
    }

    render() {
        return (
            <div>
                <div className={styles.userinput}>
                    <DropDown filter={this.handleFilter} />
                    <div className={styles.row}>
                    {markersData.filter((obj) => obj.data.types.indexOf(this.state.query.replace(' ', '_')) !== -1).map((md) => (
                        <ListView data={md}/>
                    ))}
                    </div>
                </div>
                <div id="map" className={styles.map} />
            </div>
        );
    }
}