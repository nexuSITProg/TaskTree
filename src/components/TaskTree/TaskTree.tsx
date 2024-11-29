import { observer } from 'mobx-react-lite';
import { taskStore, ITask } from '../../stores/task.store';
import { TaskItem } from './TaskItem/TaskItem';
import './TaskTree.style.scss';

export const TaskTree = observer(() => {
  const globalTasks = taskStore.globalTasks;

  return (
    <div className="task-tree">
      {globalTasks.map((globalTask: ITask) => (
        <TaskItem 
          task={globalTask}
        />
      ))}
    </div>
  );
});