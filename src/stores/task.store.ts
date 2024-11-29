import { makeAutoObservable } from 'mobx';

export interface ITask {
  _id: number;
  _title: string;
  _description: string;
  _isCompleted: boolean;
  _level: number;
  _children: ITask[];
}

class TaskStore {
  _tasks: ITask[] = [];
  _selectedTaskId: number | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadTasksFromStorage();
  }

  private saveTasksToStorage() {
    localStorage.setItem('tasks', JSON.stringify(this._tasks));
  }

  private loadTasksFromStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this._tasks = JSON.parse(storedTasks);
    }
  }

  addTask(title: string, description: string, parentId: number | null = null, level: number) {
    const newTask: ITask = {
      _id: Date.now(),
      _title: title,
      _description: description,
      _isCompleted: false,
      _level: parentId === null ? 0 : level + 1,
      _children: [],
    };

    if (parentId === null) {
      this._tasks.push(newTask);
    } else {
      const parentTask = this.findTaskById(parentId);
      if (parentTask) {
        parentTask._children.push(newTask);
      }
    }
    this.saveTasksToStorage();
  }

  deleteTask = (taskId: number) => {
    const deleteFromArray = (tasks: ITask[]): ITask[] => {
      return tasks.filter(task => {
        if (task._id === taskId) {
          return false;
        }
        task._children = deleteFromArray(task._children);
        return true;
      });
    };

    this._tasks = deleteFromArray(this._tasks);
    this.saveTasksToStorage();
  };

  toggleTaskCompleted = (taskId: number) => {
    const updateTaskAndChildren = (tasks: ITask[], id: number): boolean => {
      for (const task of tasks) {
        if (task._id === id) {
          const newStatus = !task._isCompleted;
          task._isCompleted = newStatus;
          task._children.forEach(child => {
            this.setTaskCompletionStatus(child, newStatus);
          });
          return true;
        }
        if (updateTaskAndChildren(task._children, id)) {
          this.updateParentTaskStatus(task);
          return true;
        }
      }
      return false;
    };

    updateTaskAndChildren(this._tasks, taskId);
    this.saveTasksToStorage();
  };

  private setTaskCompletionStatus(task: ITask, status: boolean) {
    task._isCompleted = status;
    task._children.forEach(child => {
      this.setTaskCompletionStatus(child, status);
    });
  }

  private updateParentTaskStatus(task: ITask) {
    task._isCompleted = task._children.every(child => child._isCompleted);
  }

  findTaskById(id: number): ITask | undefined {
    const findTask = (tasks: ITask[]): ITask | undefined => {
      for (const task of tasks) {
        if (task._id === id) return task;
        const foundInChildren = findTask(task._children);
        if (foundInChildren) return foundInChildren;
      }
      return undefined;
    };

    return findTask(this._tasks);
  }

  setSelectedTaskId(id: number | null) {
    this._selectedTaskId = id;
  }

  get globalTasks() {
    return this._tasks.filter(task => task._level === 0);
  }

  get selectedTask() {
    return this._selectedTaskId ? this.findTaskById(this._selectedTaskId) : null;
  }
}

export const taskStore = new TaskStore();