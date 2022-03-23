const noaa_data = {
    "id": 21086,
    "country_details": {
        "id": 96,
        "name": "Fiji",
        "iso3": "FJI"
    },
    "source_display": "Noaa",
    "event_id": "2021030S16177",
    "event_title": "ANA",
    "glide_number": null,
    "event_description": "",
    "event_subject": null,
    "hazard_type": "METEOROLOGICAL AND HYDROLOGICAL",
    "hazard_cluster": "Pressure-Related",
    "specific_hazard": "Depression or Cyclone (Low Pressure Area)",
    "subtype": null,
    "event_start_date": "2021-01-30",
    "event_end_date": "2021-01-31",
    "event_duration": 1,
    "latitude": "-17.19",
    "longitude": "177.804",
    "geo_description": "",
    "admin1": "' Western', ' Western', ' Western', ' Western', ' Central'",
    "admin1_pcode": "None, None, None, None, None",
    "admin2": "'Ba', 'Ba', 'Ba', 'Ra', 'Tailevu'",
    "admin2_pcode": "None, None, None, None, None",
    "admin3": "",
    "admin3_pcode": "",
    "location_description": "",
    "source": "noaa",
    "geo_coordinates": [
        {
            "geom": {
                "type": "LineString",
                "coordinates": [
                    [
                        177.120361328125,
                        -16.68489646911621
                    ],
                    [
                        177.4000244140625,
                        -16.799999237060547
                    ]
                ]
            }
        },
        {
            "geom": {
                "type": "LineString",
                "coordinates": [
                    [
                        177.4000244140625,
                        -16.799999237060547
                    ],
                    [
                        177.80712890625,
                        -17.112688064575195
                    ]
                ]
            }
        },
        {
            "geom": {
                "type": "LineString",
                "coordinates": [
                    [
                        177.80712890625,
                        -17.112688064575195
                    ],
                    [
                        178.199951171875,
                        -17.5
                    ]
                ]
            }
        },
        {
            "geom": {
                "type": "LineString",
                "coordinates": [
                    [
                        178.199951171875,
                        -17.5
                    ],
                    [
                        178.4898681640625,
                        -17.85739517211914
                    ]
                ]
            }
        },
        {
            "geom": {
                "type": "LineString",
                "coordinates": [
                    [
                        178.4898681640625,
                        -17.85739517211914
                    ],
                    [
                        178.5999755859375,
                        -18.200000762939453
                    ]
                ]
            }
        }
    ],
    "unit": "knots",
    "value": null,
    "number_of_people_dead": null,
    "number_of_houses_damaged": null,
    "number_of_houses_destroyed": null,
    "number_of_people_missing": null,
    "number_of_people_injured": null,
    "number_of_people_displaced": null,
    "country": 96
}

const emdat_data = {
    "id": 21027,
    "country_details": {
        "id": 96,
        "name": "Fiji",
        "iso3": "FJI"
    },
    "source_display": "Emdat",
    "event_id": "2021-0070-FJI",
    "event_title": "Tropical cyclone 'Ana'",
    "glide_number": null,
    "event_description": null,
    "event_subject": null,
    "hazard_type": "METEOROLOGICAL AND HYDROLOGICAL",
    "hazard_cluster": "Wind-Related",
    "specific_hazard": "Tropical Cyclone (Cyclonic Wind, Rain [Storm] Surge)",
    "subtype": null,
    "event_start_date": "2021-01-30",
    "event_end_date": "2021-01-31",
    "event_duration": 2,
    "latitude": null,
    "longitude": null,
    "geo_description": "Ba, Nadroga & Navosa, Naitasiri, Namosi, Ra, Rewa, Serua, Tailevu (Adm2).",
    "admin1": "",
    "admin1_pcode": "",
    "admin2": "'Ba', 'Nadroga & Navosa', 'Naitasiri', 'Namosi', 'Ra', 'Rewa', 'Serua', 'Tailevu'",
    "admin2_pcode": "",
    "admin3": null,
    "admin3_pcode": null,
    "location_description": "Viti levu",
    "source": "emdat",
    "geo_coordinates": null,
    "unit": null,
    "value": null,
    "number_of_people_dead": 6,
    "number_of_houses_damaged": null,
    "number_of_houses_destroyed": null,
    "number_of_people_missing": null,
    "number_of_people_injured": null,
    "number_of_people_displaced": null,
}

const districts = [
    {
        "id": 974,
        "name": "Central"
    },
    {
        "id": 975,
        "name": "Eastern"
    },
    {
        "id": 976,
        "name": "Northern"
    },
    {
        "id": 978,
        "name": "Western"
    },
    {
        "id": 977,
        "name": "Rotuma"
    }
]


document.addEventListener('DOMContentLoaded', () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidG9nZ2xlY29ycCIsImEiOiJjazk5ZXMza2YxZmQ1M2dvNWxneTEycnQwIn0.K3u-ns63rFzM7CzrnOBm2w';
    document.getElementById('main-heading').textContent = noaa_data.event_title;
    document.getElementById('date').textContent = `${noaa_data.event_start_date} to ${noaa_data.event_end_date}`;
    const template = document.getElementById('legend-item-template');
    const legend = document.getElementById('legend-items');
    const emdat_legend = document.getElementById('legend-emdat-items')
    const noaa_affectedAreas = [
        ...new Set(
            noaa_data.admin1.split(',').map(
                a => a.trim().replace(/(^'|'$)/g, '').trim()
            )
        )
    ];
    noaa_affectedAreas.forEach((area) => {
        const legendItem = template.content.cloneNode(true);
        legendItem.children[0].textContent = area;
        legend.appendChild(legendItem);
    });
    const emdat_affectedAreas = [
        ...new Set(
            emdat_data.admin2.split(',').map(
                a => a.trim().replace(/(^'|'$)/g, '').trim()
            )
        )
    ];
    emdat_affectedAreas.forEach((area) => {
        const legendItem = template.content.cloneNode(true);
        legendItem.children[0].textContent = area;
        emdat_legend.appendChild(legendItem);
    });

    const map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/togglecorp/cl10mzqt0002f14ml4gi1grb1',
        zoom: 9,
        scrollZoom: false,
    });
    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: noaa_data.geo_coordinates.map(d => d.geom.coordinates).flat(1),
                },
            }
        ],
    };

    map.on('load', () => {
        console.info(map?.style?._layers);
        map.setLayoutProperty(
            'admin-2-highlight',
            'visibility',
            'visible',
        );

        map.setPaintProperty(
            'admin-2-highlight',
            'fill-color',
            '#eaeaea',
        );
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.fitBounds([
            176.8997,
            -21.0425,
            181.7714,
            -12.4617
        ]);

        map.addSource('LineString', {
            type: 'geojson',
            data: geojson,
        });

        map.addLayer({
            id: 'LineString',
            type: 'line',
            source: 'LineString',
            layout: {
                'line-join': 'round',
                'line-cap': 'round',
            },
            paint: {
                'line-color': '#bf93e4',
                'line-width': 5,
            },
        });

        map.on('mouseover', 'admin-2-highlight', (e) => {
            const features = e.features[0];
            if (emdat_affectedAreas.findIndex(a => a === features.properties.shapeName) !== -1) {
                console.log(features.properties.shapeName)
                map.setPaintProperty(
                    'admin-2-highlight',
                    'fill-color',
                    [
                        'match',
                        ['get', 'shapeName'],
                        features.properties.shapeName,
                        '#f00000',
                        '#eaeaea',
                    ],
                );
            }
        });

        map.on('mouseleave', 'admin-2-highlight', () => {
            map.setPaintProperty(
                'admin-2-highlight',
                'fill-color',
                '#eaeaea',
            );
        });
    });
});
