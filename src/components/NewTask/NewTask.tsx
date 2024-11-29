import { useState } from 'react';
import { taskStore } from '../../stores/task.store';

import './NewTask.style.scss';

export const NewTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    if (title.trim()) taskStore.addTask(title, description, null, 0);
    else taskStore.addTask('Задача', description, null, 0);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="new-task">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название задачи"
        className="new-task__input"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание задачи"
        className="new-task__input"
      />
      <button onClick={handleAddTask} className="new-task__button">
        Добавить задачу
      </button>
    </div>
  );
};