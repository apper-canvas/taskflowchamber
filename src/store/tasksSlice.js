import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create wireframes and mockups for the new company landing page with modern design principles',
      priority: 'high',
      status: 'in-progress',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      projectId: '2',
      assignedTo: 'user1',
      timeSpent: 5.5,
      tags: ['design', 'ui/ux', 'frontend']
    },
    {
      id: '2',
      title: 'Review quarterly reports',
      description: 'Analyze Q3 performance metrics and prepare summary for stakeholders',
      priority: 'medium',
      status: 'todo',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      projectId: '2',
      assignedTo: 'user1',
      timeSpent: 0,
      tags: ['reports', 'analysis']
    },
    {
      id: '3',
      title: 'Weekly grocery shopping',
      description: 'Buy fresh vegetables, fruits, and pantry essentials for the week',
      priority: 'low',
      status: 'todo',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      projectId: '1',
      assignedTo: 'user1',
      timeSpent: 0,
      tags: ['personal', 'shopping']
    },
    {
      id: '4',
      title: 'Update project documentation',
      description: 'Revise API documentation and add new endpoint specifications',
      priority: 'urgent',
      status: 'completed',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      projectId: '2',
      assignedTo: 'user1',
      timeSpent: 3.2,
      tags: ['documentation', 'api']
    }
  ]
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload }
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    updateTaskStatus: (state, action) => {
      const { taskId, status } = action.payload
      const task = state.tasks.find(task => task.id === taskId)
      if (task) {
        task.status = status
        task.updatedAt = new Date().toISOString()
      }
    }
  }
})

export const { addTask, updateTask, deleteTask, updateTaskStatus } = tasksSlice.actions
export default tasksSlice.reducer