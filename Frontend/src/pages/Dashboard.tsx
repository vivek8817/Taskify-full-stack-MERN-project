// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskAPI, type Task } from '../api/auth';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

type FilterType = 'all' | 'pending' | 'completed';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskAPI.getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // CRUD Handlers
  const handleAddTask = async (title: string) => {
    try {
      const newTask = await taskAPI.createTask(title);
      setTasks([newTask, ...tasks]); // Optimistically prepend new task
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    // Optimistic UI update for snappy feel
    setTasks(tasks.map(task => task._id === id ? { ...task, completed } : task));
    try {
      await taskAPI.updateTask(id, { completed });
    } catch (error) {
      // Revert if API fails
      setTasks(tasks.map(task => task._id === id ? { ...task, completed: !completed } : task));
      console.error("Failed to toggle task", error);
    }
  };


  // Filter Logic
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // 'all'
  });


  const handleDeleteTask = async (id: string) => {
    // Optimistic UI update
    const previousTasks = [...tasks];
    setTasks(tasks.filter(task => task._id !== id));
    try {
      await taskAPI.deleteTask(id);
    } catch (error) {
      setTasks(previousTasks); // Revert on failure
      console.error("Failed to delete task", error);
    }
  };



  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-8">
      
      {/* Header Section (8-point grid: max-w-3xl, w-full, mb-8) */}
      <header className="w-full max-w-3xl flex justify-between items-center mb-8 bg-surface p-4 rounded-xl border border-mainDash shadow-lg">
        <div className="flex items-center gap-3">
          <iconify-icon icon="mdi:check-all" width="28" style={{ color: 'var(--color-brand)' }} />
          <h1 className="text-xl font-bold text-text-main">Taskify Workspace</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-text-muted text-sm font-medium">Hello, {user?.name}</span>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-mainDash hover:bg-background text-text-main border border-mainDash rounded-xl transition-all text-sm font-medium"
          >
            <iconify-icon icon="mdi:logout" width="18" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-3xl flex flex-col gap-8">

       
        
        {/* Task Form Placeholder (Agle step mein aayega) */}
        <div className="bg-surface p-6 rounded-xl border border-mainDash shadow-md text-center text-text-muted">
           <TaskForm onAdd={handleAddTask} />
        </div>

        {/* Tasks List Placeholder */}
        <div className="bg-surface p-6 rounded-xl border border-mainDash shadow-md flex flex-col gap-4">

{/* Header & Filter Controls */}
          <div className="flex justify-between items-center border-b border-mainDash pb-4">
            <h2 className="text-xl font-bold text-text-main">Your Tasks</h2>
            
            <div className="flex bg-background border border-mainDash rounded-xl p-1">
              {(['all', 'pending', 'completed'] as FilterType[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-base font-medium capitalize transition-all ${filter === f ? 'bg-surface shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
{/* List Rendering */}
          <div className="flex flex-col gap-4">
            {loading ? (
              <div className="flex justify-center p-8">
                <iconify-icon icon="eos-icons:loading" width="40" style={{ color: 'var(--color-brand)' }} />
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center text-text-muted p-12 flex flex-col items-center gap-4">
                <iconify-icon icon="mdi:clipboard-text-outline" width="48" />
                <p className="text-base">No {filter !== 'all' ? filter : ''} tasks found. You're all caught up!</p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <TaskItem 
                  key={task._id} 
                  task={task} 
                  onToggle={handleToggleTask} 
                  onDelete={handleDeleteTask} 
                />
              ))
            )}
          </div>

        </div>
      </main>

    </div>
  );
};

export default Dashboard;