import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { taskStore, ITask } from '../../stores/task.store';

import './ActionMenu.style.scss';

interface ActionMenuProps {
  task: ITask;
  onOpenAddSubTask: () => void;
}

export const ActionMenu = observer(({ task, onOpenAddSubTask }: ActionMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMenuOpen(prev => !prev);

  const handleDeleteTask = () => {
    taskStore.deleteTask(task._id);
    setIsMenuOpen(false);
  };

  const handleAddSubTask = () => {
    onOpenAddSubTask();
    setIsMenuOpen(false);
  };

  return (
    <div className="action-menu">
      <button className="action-menu__toggle" onClick={handleToggleMenu}>
        ...
      </button>
      {isMenuOpen && (
        <div className="action-menu__dropdown">
          <button className="action-menu__item" onClick={handleAddSubTask}>
            Добавить подзадачу
          </button>
          <button 
            className="action-menu__item" 
            onClick={handleDeleteTask}
          >
            {task._isCompleted ? 'Удалить задачу' : 'Удалить незавершенную задачу'}
          </button>
        </div>
      )}
    </div>
  );
});