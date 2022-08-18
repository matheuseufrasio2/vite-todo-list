import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './global.css';
import styles from './App.module.css';
import { Header } from './components/Header';

import plus from './assets/plus.svg';

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App() {
  const [taskToCreate, setTaskToCreate] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

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
          <button type="submit">
            Criar
            <img src={plus} alt="Adicionar" />
          </button>
        </form>
        <div className={styles.taskListContainer}>
          <header>
            <div>
              <strong>Tarefas criadas</strong>
              <span>5</span>
            </div>
            <div>
              <strong>Concluídas</strong>
              <span>2 de 5</span>
            </div>
          </header>
          <div className={styles.tasks}>
            {tasks.map((task) => (
              <div key={task.id}>
                <p>{task.title}</p>
                <p>{task.isCompleted}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
