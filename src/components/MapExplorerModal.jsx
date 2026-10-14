import React from 'react';
import { X, MapPin, Maximize2, Sparkles } from 'lucide-react';
import PropertyMapView from './PropertyMapView';
import { sound } from '../utils/sound';

export default function MapExplorerModal({
  isOpen,
  onClose,
  properties,
  selectedProperty,
  onSelectProperty,
  searchLocation,
  setSearchLocation,
  mode,
  addToast
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 overflow-hidden animate-fade-in">
      <div className="bg-white w-full max-w-6xl h-[92vh] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 flex flex-col my-auto animate-slide-up">
        
        {/* Modal Header */}
        <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <MapPin className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                  Tembisa & Midrand Interactive Map
                </h3>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {properties.length} Properties
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Click area buttons to fly directly or click price pins to inspect homes like Property24
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.play('click');
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Map View Body */}
        <div className="flex-1 w-full relative">
          <PropertyMapView
            properties={properties}
            selectedProperty={selectedProperty}
            onSelectProperty={(prop) => {
              onClose();
              if (onSelectProperty) onSelectProperty(prop);
            }}
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            mode={mode}
            height="100%"
            className="w-full h-full rounded-none border-none"
            addToast={addToast}
          />
        </div>

      </div>
    </div>
  );
}
