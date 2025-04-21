'use client';

import {useState, useEffect} from 'react';



export default function carDetails(){

  const [vinNum, setVinNum] = useState('2HGFG3B00CH508541');
  const [carData, setCarData] = useState([]);
  const [searching, setSearching] = useState(false);

  function handleSearch(){
      async function getCarData(){
        setSearching(true);
        try{
          const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vinNum}?format=json`);
          const data = await res.json();
          setCarData(data.Results[0]);
        } catch(err){
           console.error('Failed to fetch post:,', err);
           alert("Vin not found");
        }finally{
          setSearching(false)
        }
      }
 
      getCarData();
  }

  function handleChange(e){
      const inputVal = e.target.value.trim();
      setVinNum(inputVal);
  }

  return (
    <>
    <div className="w-full max-w-sm min-w-[200px]">
      <div className="relative">
        <input onChange={handleChange}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="UI Kits, Dashboards..." 
        />
        <button onClick={handleSearch}
          className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button" 
        >
    
               {searching ? 'Searching...' : 'Search'}
        </button> 
      </div>
    </div>

    <div className ="section-wrapper">
    <h1><strong>Vin Number: </strong>{carData.VIN}</h1>
    <h1><strong>Make: </strong>{carData.Make}</h1>
    <h1><strong>Model: </strong>{carData.Model}</h1>
    <h1><strong>Year: </strong>{carData.ModelYear}</h1>
    <h1><strong>Engine HP: </strong>{carData.EngineHP}</h1>
    <h1><strong>Vehicle Type: </strong>{carData.VehicleType}</h1>
    <h1><strong>Country: </strong>{carData.PlantCountry}</h1>
    <h1><strong>Manufacturer: </strong>{carData.Manufacturer}</h1>
    <h1><strong>Fuel Type: </strong>{carData.FuelTypePrimary}</h1>
    <h1><strong>Drive Type: </strong>{carData.DriveType}</h1>
    <h1><strong>Body Type: </strong>{carData.BodyClass}</h1>
    </div>
    </>
    )
}