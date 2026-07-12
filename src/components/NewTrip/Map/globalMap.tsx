"use client"
import * as mapboxgl from 'mapbox-gl/esm';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useContext } from 'react';
import { ChatContext } from '@/context/ChatContext';
import { TripPlanProps } from '@/types';

function GlobalMap({ tripDetail: propTripDetail }: { tripDetail?: TripPlanProps | null }) {
    const contextTripDetail = useContext(ChatContext)?.tripDetail ?? null;
    const tripDetail = propTripDetail ?? contextTripDetail;

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        const map = new mapboxgl.Map({
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/standard',
            center: [-71.06776, 42.35816],
            zoom: 2,
            projection: 'globe',
        });

        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!mapRef.current || !tripDetail) return;

        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];

        const activities = tripDetail.itinerary.flatMap((day) => day.activities ?? []);

        activities.forEach((activity) => {
            const { longitude, latitude } = activity.geo_coordinates;
            const marker = new mapboxgl.Marker({ color: 'red' })
                .setLngLat([longitude, latitude])
                .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(activity.place_name))
                .addTo(mapRef.current!);

            markersRef.current.push(marker);
        });

        if (activities.length > 0) {
            const { longitude, latitude } = activities[0].geo_coordinates;
            mapRef.current.flyTo({ center: [longitude, latitude], zoom: 10 });
        }
    }, [tripDetail]);

    return (
        <div className="h-full w-full rounded-2xl mt-10 overflow-hidden">
            <div ref={mapContainerRef} className="h-[85vh] w-full" />
        </div>
    );
}

export default GlobalMap;
