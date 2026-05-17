// src/components/TaskItem.tsx
import React from 'react';
import { type Task } from '../api/auth';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${task.completed ? 'bg-background/50 border-mainDash opacity-70' : 'bg-background border-mainDash hover:border-text-muted/30'}`}>
      
      <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => onToggle(task._id, !task.completed)}>
        {/* Custom Checkbox mimicking radio/checkbox logic */}
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-brand border-brand' : 'border-text-muted'}`}>
          {task.completed && <iconify-icon icon="mdi:check" width="16" style={{ color: 'var(--color-brand-dark)' }} />}
        </div>
        
        <span className={`text-base font-medium transition-all ${task.completed ? 'text-text-muted line-through' : 'text-text-main'}`}>
          {task.title}
        </span>
      </div>

      <button 
        onClick={() => onDelete(task._id)}
        className="p-2 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all flex items-center justify-center"
        title="Delete Task"
      >
        <iconify-icon icon="mdi:trash-can-outline" width="24" />
      </button>

    </div>
  );
};

export default TaskItem;