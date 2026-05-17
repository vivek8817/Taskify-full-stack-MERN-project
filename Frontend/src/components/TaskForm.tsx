import { useState } from "react"


interface TaskFormProps{
    onAdd: (title:string) => void
}

const TaskForm: React.FC<TaskFormProps> = ({onAdd}) => {

const [title, setTitle] = useState('')
const [isSubmitting, setIsSubmitting] = useState(false);


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
        await onAdd(title);
        setTitle('');
    } catch (err) {
        console.error(err);
    } finally {
        setIsSubmitting(false);
    }
    
}


  return (
<form onSubmit={handleSubmit} className="bg-surface p-6 rounded-xl border border-mainDash shadow-md flex gap-4"> 
  <input 
    type="text" 
    placeholder="What needs to be done?" 
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    disabled={isSubmitting}
    className="flex-1 bg-background border border-mainDash rounded-xl py-3 px-4 text-text-main text-base placeholder:text-text-muted focus:border-brand focus:ring-1 focus:ring-brand transition-all outline-none" 
  /> 
  <button 
    type="submit"
    disabled={isSubmitting || !title.trim()} 
    className="bg-brand text-brand-dark font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 text-base" 
  > 
    <iconify-icon icon="mdi:plus-circle" width="24" /> 
    <span>Add Task</span> 
  </button> 
</form>

  )
}

export default TaskForm