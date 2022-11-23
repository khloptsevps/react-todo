import dayjs from 'dayjs';

export default (snapshot, filesData) => {
  const todoList = snapshot.docs.map((doc) => {
    const { files, dueDate } = doc.data();
    const docFiles = filesData.filter(({ link }) => files.includes(link));
    const newDueDate = dayjs(dueDate).format('YYYY-MM-DD');
    const todo = {
      id: doc.id,
      ...doc.data(),
      dueDate: newDueDate,
      files: docFiles,
    };
    return todo;
  });
  return todoList.sort((a, b) => {
    const aCreated = dayjs(a.createdAt).format('YYYY-MM-DD HH:mm:ss');
    const bCreated = dayjs(b.createdAt).format('YYYY-MM-DD HH:mm:ss');
    const aDate = new Date(aCreated);
    const bDate = new Date(bCreated);
    return bDate - aDate;
  });
};
