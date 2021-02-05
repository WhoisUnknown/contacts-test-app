
import axios from 'axios';
/**
 * Упрощённая обёртка над axios, которая НИКОГДА не бросает catch
 * Нужна для того, чтобы можно было безопасно использоватьв async/await функциях
 * @param {Object|String} url строка конечного url или объект
 * @param {String} url.url строка конечного url при задании url как объекта
 * @param {Object} url.params объект, где ключ это значение в url, которое нужно заменить, например, {breed:'vizsla'} заменит :breed в url
 * @param {Object} url.query query параметры для отправки запроса
 * @param {String} method метод запроса, по-умолчанию Get
 * @param {Object|Undefined} data данные запроса
 * @
 */
export default async function (url, method = 'get', data) {
  let resUrl = url;
  let result = { success: false, data: null, code: null };
  // Обрабатываем параметры для url
  if (typeof url === 'object') {
    resUrl = url.url;
    if (url.params) {
      Object.keys(url.params).forEach(key => {
        resUrl = resUrl.replace(`:${key}`, url.params[key]);
      });
    }
  }
  try {
    const res = await axios[method](resUrl, {
      params: typeof url === 'object' ? url.query : undefined,
    });
    result = {
      success: true,
      data: res.data,
      code: res.status,
    };
  } catch (error) {
    result.error = error;
  }
  return result;
}
