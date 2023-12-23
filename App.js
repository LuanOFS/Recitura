import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import MapView from 'react-native-maps';

const HomeScreen = () => {
  const [vaccinationLocations, setVaccinationLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
        setError('Erro ao obter dados. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

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
