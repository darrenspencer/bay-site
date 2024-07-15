import React, { useEffect, useState } from 'react';
import MapComponent from './MapComponent';

// Define the ThermalTherapy interface
interface ThermalTherapy {
  name: string;
  description: string;
  instagram: string;
  website: string;
  basic_pass_fee: number;
  google_maps: string;
}

const ThermalTherapy = () => {
  const [therapies, setTherapies] = useState<ThermalTherapy[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    const SHEET_ID = '1g5nRXvkbsstF49XbNXGIgt_Jc1ML-MD0pKdeDtiEDAU';
    const RANGE = 'ThermalTherapy!A1:G3';
    const API_KEY = 'AIzaSyCdlizmgvxUmwRaojnncaO7J-QHnnyy11M';
    const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    fetch(URL)
    .then(response => response.json())
    .then(data => {
      const rows = data.values || [];
      const therapiesData = rows.slice(1).map((row: any[]) => {
        return {
          id: row[0],
          name: row[1],
          description: row[2],
          website: row[3],
          instagram: row[4],
          basic_pass_fee: parseFloat(row[5]),
          google_maps: row[6],
        };
      });
      setTherapies(therapiesData);
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredTherapies = therapies.filter((therapy: ThermalTherapy) => {
    const isFeeAcceptable = maxPrice === null ? therapy.basic_pass_fee !== undefined : (therapy.basic_pass_fee !== null && therapy.basic_pass_fee <= maxPrice);
    return isFeeAcceptable;
  });

  return (
    <div>
      <h1>Thermal Therapy</h1>
      <p>There are many spas and massage places in the Bay Area, but there are only a couple of the communal saunas, baths, and cold exposure that I like. Here they are.</p>

      {/* Filters */}
      <div className="filters">
        {/* Maximum Price Filter */}
        <label>
          <strong>Basic pass fee max: </strong>
          <input 
            type="number" 
            value={maxPrice ?? ''} 
            onChange={(e) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : null)} 
          />
        </label>
      </div>

      {/* Google Map */}
      <MapComponent clubs={filteredTherapies} />

      {/* Therapy Listings */}
      <ul>
        {filteredTherapies.map((therapy, index) => (
          <li key={index} className="therapy-listing">
            <h2>{therapy.name}</h2>
            <div>{therapy.description}</div>
            <div className="therapy-links">
              {therapy.instagram && <a href={therapy.instagram} target="_blank" rel="noopener noreferrer"><img src="/icons/instagram.png" alt="Instagram" /></a>}
              {therapy.website && <a href={therapy.website} target="_blank" rel="noopener noreferrer"><img src="/icons/website.png" alt="Website" /></a>}
            </div>
            <div><strong>Basic Pass Fee:</strong> {therapy.basic_pass_fee === 0 ? 'Free' : (therapy.basic_pass_fee ? `$${therapy.basic_pass_fee}` : 'Unknown')}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThermalTherapy;
