import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { taskStore, ITask } from '../../../stores/task.store';
import { Modal } from '../../Modal/Modal';
import { AddSubTask } from '../../Modal/AddSubTask/AddSubTask';
import { ActionMenu } from '../../ActionMenu/ActionMenu';

import './TaskItem.style.scss';

export const TaskItem = observer(({ task }: { task: ITask }) => {
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const handleToggleCompleted = () => taskStore.toggleTaskCompleted(task._id);
  const handleCloseModalAddMenu = () => setIsModalAddOpen(false);
  const handleOpenAddSubTask = () => setIsModalAddOpen(true);

  const getLevelClass = (level: number) => {
    if (level <= 2) return `level-${level}`;
    return 'level-3';
  };

  return (
    <>
      {isModalAddOpen && 
        <Modal
          isOpen={isModalAddOpen}
          onClose={handleCloseModalAddMenu}
        >
          <AddSubTask
            task={task}
            onClose={handleCloseModalAddMenu}
          />
        </Modal>
      }
      <div 
        className={`task-item ${getLevelClass(task._level)}`} 
        style={{ marginLeft: `${task._level * 10}px` }}
        tabIndex={0}
      >
        <div className="task-item__content">
          <div className="task-item__header">
            <div className="task-item__title">
              <label className="task-item__checkbox-wrapper" htmlFor={`task-${task._id}`}>
                <input
                    type="checkbox"
                    className="task-item__checkbox"
                    checked={task._isCompleted}
                    onChange={handleToggleCompleted}
                    id={`task-${task._id}`}
                />
                <span className="task-item__checkbox-custom"></span>
              </label>
              <h3 className={`task-item__heading ${task._isCompleted ? 'task-item__heading--completed' : ''}`}>
                {task._title}
              </h3>
            </div>
            <ActionMenu 
              task={task}
              onOpenAddSubTask={handleOpenAddSubTask}
            />         
          </div>
          {task._description && <p className="task-item__description">{task._description}</p>}
          <p className="task-item__status">{task._isCompleted ? 'Выполнена' : 'В процессе'}</p>
        </div>
        {task._children.map((subTask : ITask) => (
          <TaskItem key={subTask._id} task={subTask} />
        ))}
      </div>
    </>
  );
});