import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import axios from 'axios';
import LocalMarker from '../components/LocalMarker';

const HomeScreen = () => {
  const [vaccinationLocations, setVaccinationLocations] = useState([]);

  useEffect(() => {
    const fetchVaccinationLocations = async () => {
      try {
        const response = await axios.get('http://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=c32d30d6-71be-4731-ac33-ccca4322e502');
        const data = response.data.result.records;

        const formattedData = data.map((location) => ({
          id: location.id,
          name: location.local_vacinacao,
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude),
        }));

        
        setVaccinationLocations(formattedData);
      } catch (error) {
        console.error('Erro ao obter dados de locais de vacinação', error);
      }
    };

    // Chame a função de busca de locais de vacinação quando o componente for montado
    fetchVaccinationLocations();
  }, []); // O segundo argumento vazio garante que a chamada seja feita apenas uma vez

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: -8.0475622,
        longitude: -34.8749667,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {vaccinationLocations.map((location) => (
        <LocalMarker key={location.id} location={location} />
      ))}
    </MapView>
  );
};

export default HomeScreen;

