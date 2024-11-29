import { observer } from 'mobx-react-lite';
import { ITask, taskStore } from '../../../stores/task.store';
import { useState } from 'react';

import './AddSubTask.style.scss';

interface AddSubTaskProps {
    task: ITask;
    onClose: () => void;
}

export const AddSubTask: React.FC<AddSubTaskProps> = observer(({ task, onClose }) => {
  const [newSubTaskTitle, setNewSubTaskTitle] = useState('');
  const [newSubTaskDescription, setNewSubTaskDescription] = useState('');

  const handleAddSubTask = () => {
    if (newSubTaskTitle.trim()) taskStore.addTask(newSubTaskTitle, newSubTaskDescription, task._id, task._level);
    else taskStore.addTask('Подзадача', newSubTaskDescription, task._id, task._level);
    setNewSubTaskTitle('');
    setNewSubTaskDescription('');
    onClose();
  };

  return (
    <>
      <input
        type="text"
        value={newSubTaskTitle}
        onChange={(e) => setNewSubTaskTitle(e.target.value)}
        placeholder="Название подзадачи"
        className='add-subtask__input'
      />
      <input
        type="text"
        value={newSubTaskDescription}
        onChange={(e) => setNewSubTaskDescription(e.target.value)}
        placeholder="Описание подзадачи"
        className='add-subtask__input'
      />
      <button 
        onClick={handleAddSubTask}
        className='add-subtask__button'
      >
        Добавить подзадачу
      </button>
    </>
  )
})
