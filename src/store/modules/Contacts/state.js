
import { getCountries } from './data.js';
export default function () {
  return {
    // загружается список или нет
    loadingList: false,
    // список контактов с бекенда
    contactsList: [],
    // список контактов с бекенда
    contactsFilters: {
      search: '',
    },

    countries: getCountries(),

  };
}
