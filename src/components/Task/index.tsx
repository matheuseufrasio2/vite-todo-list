/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useState } from 'react';
import { ITask } from '../../App';
import { Trash } from '../Trash';
import styles from './Task.module.css';

interface TaskProps {
  task: ITask;
  // eslint-disable-next-line no-unused-vars
  onHandleDeleteTask: (taskId: string) => void;
  // eslint-disable-next-line no-unused-vars
  onToggleTaskIsCompleted: (taskId: string) => void;
}

export function Task({ task, onHandleDeleteTask, onToggleTaskIsCompleted } : TaskProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div key={task.id} className={task.isCompleted ? styles.taskCompleted : styles.task}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        className={task.isCompleted ? styles.checked : styles.unchecked}
        onChange={() => onToggleTaskIsCompleted(task.id)}
      />
      <p>{task.title}</p>
      <button
        type="button"
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        onClick={() => onHandleDeleteTask(task.id)}
      >
        {isHovering ? (
          <Trash color="#E25858" />
        ) : (
          <Trash color="#808080" />
        )}
      </button>
    </div>
  );
}
