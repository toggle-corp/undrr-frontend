const data = {
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
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ28taWZyYyIsImEiOiJjams3b2ZhZWswMGFvM3hxeHp2ZHFhOTRrIn0._pqO9OQ2iNeDGrpopJNjpg';
    document.getElementById('main-heading').textContent = data.event_title;
    document.getElementById('date').textContent = `${data.event_start_date} to ${data.event_end_date}`;
    const template = document.getElementById('legend-item-template');
    const legend = document.getElementById('legend-items');
    const affectedAreas = [
        ...new Set(
            data.admin1.split(',').map(
                a => a.trim().replace(/(^'|'$)/g, '').trim()
            )
        )
    ];
    affectedAreas.forEach((area) => {
        const legendItem = template.content.cloneNode(true);
        legendItem.children[0].textContent = area;
        legend.appendChild(legendItem);
    });

    const map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/go-ifrc/ckrfe16ru4c8718phmckdfjh0',
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
                    coordinates: data.geo_coordinates.map(d => d.geom.coordinates).flat(1),
                },
            }
        ],
    };

    map.on('load', () => {
        map.setLayoutProperty(
            'admin-1-highlight',
            'visibility',
            'visible',
        );

        map.setPaintProperty(
            'admin-1-highlight',
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

        map.on('mouseover', 'admin-1-highlight', (e) => {
            const features = e.features[0];
            if (affectedAreas.findIndex(a => a === features.properties.name) !== -1) {
                map.setPaintProperty(
                    'admin-1-highlight',
                    'fill-color',
                    [
                        'match',
                        ['get', 'district_id'],
                        features.properties.district_id,
                        '#f00000',
                        '#eaeaea',
                    ],
                );
            }
        });

        map.on('mouseleave', 'admin-1-highlight', () => {
            map.setPaintProperty(
                'admin-1-highlight',
                'fill-color',
                '#eaeaea',
            );
        });
    });
});
