
export function getCountries() {
  return [
    { id: 1, name: 'Russia' },
    { id: 2, name: 'USA' },
    { id: 3, name: 'Germany' },
  ];
}

/**
 * Сторейдж является подобием БД. При генерации списка в него записываются все сгенерированные записи
 * При дальнейшем редактировании/удалении мы будем обращаться именно к сторейджу
 */
export function getList(query = {}) {
  const generateList = () => {
    const initItem = {
      firstName: 'Mister',
      lastName: 'Twister',
      company: 'Balabit',
      jobTitle: 'Engineer',
      country: { id: 1, name: 'Russia' },
      email: 'mister-twister@salaryboard.com',
      phone: '+44 2040802211',
    };
    const list = [...new Array(8)].map(i => ({ ...initItem, id: parseInt(Math.random() * 10000, 10) }));
    window.localStorage.setItem('contacts_list', JSON.stringify(list));
    return list;
  };
  let resultList = [];
  const storageList = window.localStorage.getItem('contacts_list') || null;
  if (storageList) {
    try {
      resultList = JSON.parse(storageList);
    } catch (e) {
      console.error(e);
      resultList = generateList();
    }
  } else {
    resultList = generateList();
  }
  if (typeof query.search === 'string') {
    const q = query.search.toLowerCase();
    resultList = resultList.filter(i => {
      return ((i.email || '').toLowerCase().includes(q) ||
      (i.firstName || '').toLowerCase().includes(q) ||
      (i.lastName || '').toLowerCase().includes(q) ||
      (i.company || '').toLowerCase().includes(q));
    });
  }
  return resultList;
}

/**
 * Добавление контакта в список
 * @param {Object} fields поля для создания элемента
 */
export function addItem(fields) {
  const list = getList();
  const newItem = {
    ...fields,
    id: parseInt(Math.random() * 10000, 10),
  };
  list.push(newItem);
  window.localStorage.setItem('contacts_list', JSON.stringify(list));

  return { success: true, item: newItem };
}

/**
 * Редактирование списка
 * @param {Number} id id редактируемого элемента
 * @param {Object} fields поля для редактирования элемента
 */
export function editItem(id, fields) {
  const list = getList();
  const index = list.findIndex(i => i.id === id);
  list[index] = Object.assign(list[index], fields);

  window.localStorage.setItem('contacts_list', JSON.stringify(list));
  return { success: true, item: list[index] };
}

/**
 * Удаление элемента из списка контактов
 * @param {Number} id id редактируемого элемента
 */
export function removeItem(id) {
  const list = getList();
  const index = list.findIndex(i => i.id === id);
  list.splice(index, 1);

  window.localStorage.setItem('contacts_list', JSON.stringify(list));
  return { success: true };
}
