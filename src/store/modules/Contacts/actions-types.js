/**
 * Получить список контактов
 * @param {Object} query - параметры запроса
 * @param {String} query.search  - параметр поиска
 */
export const GET_CONTACTS_LIST = 'GET_CONTACTS_LIST';

/**
 * Добавить контакт
 * @param {Object} data - данные для создания нового контакта
 */
export const ADD_CONTACT = 'ADD_CONTACT';

/**
 * Редактировать контакт
 * @param {Object} data - данные для редактирования контакта
 */
export const EDIT_CONTACT = 'EDIT_CONTACT';

/**
 * Удалить контакт
 * @param {Number} id - id контакта
 */
export const REMOVE_CONTACT = 'REMOVE_CONTACT';
