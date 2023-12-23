// api.js

import axios from 'axios';

export const fetchData = async () => {
  try {
    const apiUrl = `http://dados.recife.pe.gov.br/api/3/action/datastore_search?q=${NDose}&resource_id=c32d30d6-71be-4731-ac33-ccca4322e502`

    const response = await axios.get(apiUrl)
    .then(rasp => {
        console.log(rasp);
    })
    .catch(err => {
        console.log(err);
    })



  } catch (error) {
    console.error('Erro ao obter dados da API', error);
    return [];
  }
};


