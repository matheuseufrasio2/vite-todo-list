/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import {
  ChangeEvent, FormEvent, useMemo, useState,
} from 'react';

import { v4 as uuidv4 } from 'uuid';
import './global.css';

import styles from './App.module.css';
import { Header } from './components/Header';

import plus from './assets/plus.svg';
// import checked from './assets/checked.svg';
// import trash from './assets/trash.svg';

import { Task } from './components/Task';

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App() {
  const [taskToCreate, setTaskToCreate] = useState('');
  const [tasks, setTasks] = useState<ITask[]>([]);

  const totalTasksCreated = useMemo(() => tasks.length, [tasks]);
  const tasksOrderedByCompleted = useMemo(() => tasks.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted)), [tasks]);
  const totalTasksCompleted = useMemo(() => {
    const taskCompleted = tasks.reduce((acc, actualItem) => {
      if (actualItem.isCompleted) return acc + 1;
      return acc;
    }, 0);

    return `${taskCompleted} de ${tasks.length}`;
  }, [tasks]);

  function handleAddTask(event: FormEvent) {
    event.preventDefault();

    setTasks(
      (prevState) => [...prevState, { id: uuidv4(), isCompleted: false, title: taskToCreate }],
    );
    setTaskToCreate('');
  }

  function handleChangeTaskToCreateTerm(event: ChangeEvent<HTMLInputElement>) {
    setTaskToCreate(event.target.value);
  }

  function handleDeleteTask(taskId: string) {
    setTasks((prevState) => prevState.filter((task) => task.id !== taskId));
  }

  function toggleTaskIsCompleted(taskId: string) {
    setTasks((prevState) => prevState.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      return task;
    }));
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content}>
        <form onSubmit={handleAddTask}>
          <input
            value={taskToCreate}
            onChange={handleChangeTaskToCreateTerm}
            placeholder="Adicionar nova tarefa"
            type="text"
          />
          <button type="submit" disabled={taskToCreate.length === 0}>
            Criar
            <img src={plus} alt="Adicionar" />
          </button>
        </form>
        <div className={styles.taskListContainer}>
          <header>
            <div>
              <strong>Tarefas criadas</strong>
              <span>{totalTasksCreated}</span>
            </div>
            <div>
              <strong className={styles.purple}>Concluídas</strong>
              <span>{totalTasksCompleted}</span>
            </div>
          </header>
          <div>
            {tasksOrderedByCompleted.map((task) => (
              <Task
                key={task.id}
                task={task}
                onHandleDeleteTask={handleDeleteTask}
                onToggleTaskIsCompleted={toggleTaskIsCompleted}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
