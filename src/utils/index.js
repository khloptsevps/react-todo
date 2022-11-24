import dayjs from 'dayjs';

/**
 * Функция нормализации данных полученных от Backend;
 * @param  {} snapshot - snapshot всех Todo из БД Firebase;
 * @param  {} filesData - данные о файлах из БД Firebase;
 * @example
 * normalize(snapshot, filesData) // [{id:"PQaLCh92Dly6NSfleKef", title:"просроченная задача", description:"просроченная задача", files: [], complete:false, dueDate:"2022-11-10", createdAt:"Wed Nov 23 2022 22:29:35 GMT+1000 (Vladivostok Standard Time)"}]
 * @returns {Array} возвращает отсортированный по дате добавления массив объектов Todo;
 */
export default (snapshot, filesData) => {
  const todoList = snapshot.docs.map((doc) => {
    const { files, dueDate } = doc.data();
    const docFiles = filesData.filter(({ link }) => files.includes(link));
    const newDueDate = dayjs(dueDate).format('YYYY-MM-DD');
    /**
     * A Todo
     * @typedef {Object} Todo
     * @property {string} id - Todo ID
     * @property {string} title - Название Todo
     * @property {string} description - Описание Todo
     * @property {boolean} complete - Завершен ли Todo
     * @property {Array.<string>} files - Файлы
     * @property {string} dueDate - дата выполнения
     * @property {string} cratedAt - дата создания
     */

    /**
     * @type {Todo}
     */
    const todo = {
      id: doc.id,
      ...doc.data(),
      dueDate: newDueDate,
      files: docFiles,
    };
    return todo;
  });
  return todoList.sort((a, b) => {
    const aCreated = dayjs(a.createdAt).toDate();
    const bCreated = dayjs(b.createdAt).toDate();
    return bCreated - aCreated;
  });
};
