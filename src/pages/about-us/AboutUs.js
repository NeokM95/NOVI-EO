import mapboxgl from 'mapbox-gl';

import styles from './aboutUs.module.css'
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = 'pk.eyJ1IjoiZHJtZW56IiwiYSI6ImNrdnFvYnFzNjFuM3kycXFmb3hra2RjeXIifQ.PZpQTyGeyWDDDss3kYBsKg'


function AboutUs() {

    const mapContainer = useRef( null );
    const map = useRef( null );
    const [ lng, setLng ] = useState( 4.80934 );
    const [ lat, setLat ] = useState( 52.46725 );
    const [ zoom, setZoom ] = useState( 18 );

    useEffect( () => {
        if ( map.current ) return; // initialize map only once
        map.current = new mapboxgl.Map( {
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ lng, lat ],
            zoom: zoom
        } );
    }, [] );

    return (
        <div className={ styles["about-us-container"] }>
            <div className={ styles["contact-container"] }>
                <div className={ styles["contact-details"] }>
                    <h2 className={ styles["contact-header"] }>Contact Informatie</h2>
                    <ul>
                        <li><span className={ styles["cd-title"] }>Hoofdkantoor:</span> Jan Bestevaerstraat 83, Koog a/d
                            Zaan
                        </li>
                        <li><span className={ styles["cd-title"] }>Telefoon helpdesk:</span> (555) 555-5555</li>
                        <li><span className={ styles["cd-title"] }>Telefoon nieuwe inschrijving:</span> (777) 777-7777
                        </li>
                        <li><span className={ styles["cd-title"] }>Email helpdesk:</span> helpdesk@ChiefCount.nl</li>
                        <li><span
                            className={ styles["cd-title"] }>Email nieuwe inschrijving:</span> inschrijven@ChiefCount.nl
                        </li>
                    </ul>
                </div>

                <div ref={ mapContainer } className="map-container"/>

            </div>

        </div>

    );
}


export default AboutUs;