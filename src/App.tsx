import { observer } from 'mobx-react-lite';
import { taskStore, ITask } from './stores/task.store';
import { Header } from './layout/Header/Header';
import { Main } from './layout/Main/Main';

export const App = observer(() => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Delete') {
      const deleteCompletedTasks = (tasks: ITask[]) => {
        return tasks.filter(task => {
          if (task._isCompleted) {
            taskStore.deleteTask(task._id);
            return false;
          }
          task._children = deleteCompletedTasks(task._children);
          return true;
        });
      };
  
      taskStore._tasks = deleteCompletedTasks(taskStore._tasks);
    }
  };

  return (
    <div className="app" onKeyDown={handleKeyDown}>
      <Header />
      <Main />
    </div>
  );
});