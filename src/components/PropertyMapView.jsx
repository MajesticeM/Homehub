import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  X,
  Bed,
  Bath,
  ArrowRight,
  Maximize2,
  Navigation,
  Layers,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/sound';

export const MAP_AREAS = [
  { name: 'All Areas', lat: -25.998, lng: 28.18, zoom: 12, region: 'All' },
  { name: 'Waterfall City', lat: -26.0125, lng: 28.1182, zoom: 14, region: 'Midrand' },
  { name: 'Carlswald', lat: -25.9842, lng: 28.1245, zoom: 14, region: 'Midrand' },
  { name: 'Vorna Valley', lat: -26.0021, lng: 28.1287, zoom: 14, region: 'Midrand' },
  { name: 'Noordwyk', lat: -25.9684, lng: 28.1342, zoom: 14, region: 'Midrand' },
  { name: 'Clayville', lat: -25.9815, lng: 28.2321, zoom: 14, region: 'Tembisa' },
  { name: 'Phomolong', lat: -26.0084, lng: 28.2198, zoom: 14, region: 'Tembisa' },
  { name: 'Winnie Mandela', lat: -25.9928, lng: 28.2145, zoom: 14, region: 'Tembisa' },
  { name: 'Birch Acres', lat: -26.0215, lng: 28.2045, zoom: 14, region: 'Tembisa' }
];

export default function PropertyMapView({
  properties = [],
  selectedProperty,
  onSelectProperty,
  searchLocation,
  setSearchLocation,
  mode = 'rent',
  className = '',
  height = '520px',
  addToast
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const [activeProperty, setActiveProperty] = useState(null);
  const [selectedAreaName, setSelectedAreaName] = useState('All Areas');

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const initialCenter = [-25.998, 28.18];
    const initialZoom = 12;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: false
    });

    // Clean OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Zoom controls at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when properties change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    if (properties.length === 0) return;

    const bounds = L.latLngBounds([]);

    properties.forEach((prop) => {
      if (!prop.coordinates || !prop.coordinates.lat || !prop.coordinates.lng) return;

      const lat = prop.coordinates.lat;
      const lng = prop.coordinates.lng;
      bounds.extend([lat, lng]);

      const price = mode === 'buy' ? prop.price : prop.priceMonthly;
      const priceText =
        mode === 'buy'
          ? `R${(price / 1000).toFixed(0)}k`
          : `R${(price / 1000).toFixed(1).replace('.0', '')}k`;

      const isSelected = activeProperty?.id === prop.id;

      // Custom Property24 style interactive price pill icon
      const customIcon = L.divIcon({
        className: 'custom-property-pin-wrapper',
        html: `
          <div class="px-2.5 py-1 rounded-full text-[11px] font-black font-mono shadow-md border cursor-pointer transition-all duration-200 transform hover:scale-110 flex items-center gap-1 select-none ${
            isSelected
              ? 'bg-emerald-600 text-white border-white ring-2 ring-emerald-500 scale-110 z-50'
              : 'bg-slate-900 text-white border-white/80 hover:bg-slate-800'
          }">
            <span>${priceText}</span>
          </div>
        `,
        iconSize: [60, 26],
        iconAnchor: [30, 13]
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      marker.on('click', () => {
        sound.play('toggle');
        setActiveProperty(prop);
        map.flyTo([lat, lng], Math.max(map.getZoom(), 14), { duration: 0.8 });
      });

      marker.addTo(markersLayer);
    });

    // If initial load and no active filter, fit bounds
    if (bounds.isValid() && selectedAreaName === 'All Areas' && !searchLocation) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [properties, mode, activeProperty, selectedAreaName, searchLocation]);

  // Handle Area Selection Click (Fly to Area like Property24)
  const handleSelectArea = (area) => {
    setSelectedAreaName(area.name);
    sound.play('click');

    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([area.lat, area.lng], area.zoom, { duration: 1.2 });
    }

    if (area.name === 'All Areas') {
      if (setSearchLocation) setSearchLocation('');
      if (addToast) addToast('🗺️ Showing all areas in Tembisa & Midrand', 'info');
    } else {
      if (setSearchLocation) setSearchLocation(area.name);
      if (addToast) addToast(`📍 Jumped to ${area.name} on map`, 'success');
    }
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 ${className}`}>
      
      {/* 1. TOP INTERACTIVE AREA QUICK SELECTOR (Like Property24) */}
      <div className="absolute top-3 left-3 right-3 z-40 flex items-center justify-between gap-2 pointer-events-none">
        
        {/* Scrollable Area Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200/80 pointer-events-auto max-w-full">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 px-2 shrink-0">
            <Navigation className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Areas:</span>
          </div>

          {MAP_AREAS.map((area) => {
            const isActive =
              selectedAreaName === area.name ||
              (searchLocation && searchLocation.toLowerCase().includes(area.name.toLowerCase()));

            return (
              <button
                key={area.name}
                type="button"
                onClick={() => handleSelectArea(area)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {area.name}
              </button>
            );
          })}
        </div>

        {/* Property Count Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200 text-xs font-bold text-slate-800 shrink-0 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{properties.length} on Map</span>
        </div>

      </div>

      {/* 2. LEAFLET MAP CANVAS CONTAINER */}
      <div
        ref={mapContainerRef}
        style={{ height }}
        className="w-full z-10"
      />

      {/* 3. ACTIVE PROPERTY PREVIEW CARD (Floats on Map when Pin Clicked) */}
      {activeProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-40 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-slate-200 animate-slide-up">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900 text-white">
                {activeProperty.type}
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                {activeProperty.neighborhood || activeProperty.location}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveProperty(null)}
              className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3 mt-2.5">
            <img
              src={activeProperty.images?.[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80'}
              alt={activeProperty.title}
              className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h5 className="text-xs font-bold text-slate-900 truncate">
                {activeProperty.title}
              </h5>
              <div className="text-sm font-extrabold text-slate-900 font-mono mt-0.5">
                R{(mode === 'buy' ? activeProperty.price : activeProperty.priceMonthly).toLocaleString()}
                <span className="text-[10px] font-sans text-slate-500 font-normal">
                  {mode === 'buy' ? '' : '/mo'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  <Bed className="w-3 h-3 text-slate-400" />
                  {activeProperty.beds} Beds
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Bath className="w-3 h-3 text-slate-400" />
                  {activeProperty.baths} Baths
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (onSelectProperty) onSelectProperty(activeProperty);
                sound.play('click');
              }}
              className="w-full py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer shadow-xs"
            >
              <span>View Property</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* 4. BOTTOM HELPER PILL */}
      <div className="absolute bottom-3 left-3 z-30 pointer-events-none hidden sm:block">
        <div className="px-3 py-1 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200 text-[10px] font-bold text-slate-600 shadow-2xs">
          Click any price pin on map to inspect details
        </div>
      </div>

    </div>
  );
}
