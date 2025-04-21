'use client';
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useState } from 'react';

export default function CarDetails() {
  const [vinNum, setVinNum] = useState('2HGFG3B00CH508541');
  const [carData, setCarData] = useState<any>(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVinNum(e.target.value.trim());
    setError('');
  };

  const handleSearch = async () => {
    if (!vinNum) {
      setError('Please enter a VIN number.');
      return;
    }

    setSearching(true);
    setError('');
    setCarData(null);

    try {
      const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vinNum}?format=json`
      );
      const data = await res.json();
      const result = data.Results[0];

      if (result.ErrorCode !== '0') {
        setError('No data found for this VIN.');
      } else {
        setCarData(result);
      }
    } catch (err) {
      console.error('VIN fetch error:', err);
      setError('An error occurred while fetching vehicle data.');
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* VIN Input */}
      <div className="w-full max-w-sm">
        <div className="relative">
          <input
            value={vinNum}
            onChange={handleChange}
            className="w-full bg-white placeholder:text-slate-400 text-slate-800 text-sm border border-slate-300 rounded-md pl-3 pr-28 py-2 shadow-sm focus:outline-none focus:border-slate-500"
            placeholder="Enter VIN Number..."
          />
          <button
            onClick={handleSearch}
            className="absolute top-1 right-1 bg-slate-800 hover:bg-slate-700 text-white text-sm py-1 px-3 rounded-md shadow-sm disabled:opacity-50"
            type="button"
            disabled={searching}
          >
            {searching ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Car Data Display */}
      {carData && (
        <div className="space-y-1 text-sm text-slate-700">
          <h1><strong>VIN Number:</strong> {carData.VIN}</h1>
          <h1><strong>Make:</strong> {carData.Make}</h1>
          <h1><strong>Model:</strong> {carData.Model}</h1>
          <h1><strong>Year:</strong> {carData.ModelYear}</h1>
          <h1><strong>Engine HP:</strong> {carData.EngineHP}</h1>
          <h1><strong>Vehicle Type:</strong> {carData.VehicleType}</h1>
          <h1><strong>Country:</strong> {carData.PlantCountry}</h1>
          <h1><strong>Manufacturer:</strong> {carData.Manufacturer}</h1>
          <h1><strong>Fuel Type:</strong> {carData.FuelTypePrimary}</h1>
          <h1><strong>Drive Type:</strong> {carData.DriveType}</h1>
          <h1><strong>Body Type:</strong> {carData.BodyClass}</h1>
        </div>
      )}
    </div>
  );
}
