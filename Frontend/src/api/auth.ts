import axios from "axios";

const AUTH_URL = "http://localhost:5000/api/auth";
const TASK_URL = "http://localhost:5000/api/task";

// User aur Auth Data ke Types
export interface UserPayload {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export const authAPI = {
  register: async (userData: any): Promise<UserPayload> => {
    const response = await axios.post(`${AUTH_URL}/register`, userData);
    // return response.data;(before)
    const { user } = response.data; // Extract the nested 'user' object
    
    return {
      _id: user.id,   // Map backend's 'id' to frontend's '_id'
      name: user.name,
      email: user.email,
      token: user.token
    };
  },
  
  login: async (userData: any): Promise<UserPayload> => {
    const response = await axios.post(`${AUTH_URL}/login`, userData);
    // return response.data;(before)
    const { user } = response.data; // Extract the nested 'user' object
    
    return {
      _id: user.id,   // Map backend's 'id' to frontend's '_id'
      name: user.name,
      email: user.email,
      token: user.token
    };
  }
};

// Token attach karne ke liye helper function
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('taskify_user') || '{}');
  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

export const taskAPI = {
  getTasks: async (): Promise<Task[]> => {
    const response = await axios.get(TASK_URL, getAuthHeaders());
    return response.data;
  },

  createTask: async (title: string): Promise<Task> => {
    const response = await axios.post(TASK_URL, { title }, getAuthHeaders());
    return response.data;
  },

  updateTask: async (id: string, taskData: Partial<Task>): Promise<Task> => {
    const response = await axios.put(`${TASK_URL}/${id}`, taskData, getAuthHeaders());
    return response.data;
  },

  deleteTask: async (id: string): Promise<{ id: string }> => {
    const response = await axios.delete(`${TASK_URL}/${id}`, getAuthHeaders());
    return response.data;
  }
};