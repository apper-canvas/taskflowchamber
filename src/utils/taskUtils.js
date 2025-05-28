export const filterTasksByProject = (tasks, projectId) => {
  if (projectId === 'all') {
    return tasks
  }
  return tasks.filter(task => task.projectId === projectId)
}

export const groupTasksByStatus = (tasks) => {
  return tasks.reduce((groups, task) => {
    const status = task.status
    if (!groups[status]) {
      groups[status] = []
    }
    groups[status].push(task)
    return groups
  }, {})
}

export const getTaskPriorityOrder = (priority) => {
  const priorityOrder = {
    'urgent': 4,
    'high': 3,
    'medium': 2,
    'low': 1
  }
  return priorityOrder[priority] || 0
}

export const sortTasksByPriority = (tasks) => {
  return [...tasks].sort((a, b) => {
    return getTaskPriorityOrder(b.priority) - getTaskPriorityOrder(a.priority)
  })
}

export const getTaskProgress = (tasks) => {
  if (tasks.length === 0) return 0
  
  const completed = tasks.filter(task => task.status === 'completed').length
  return Math.round((completed / tasks.length) * 100)
}


export const getOverdueTasks = (tasks) => {
  const now = new Date()
  return tasks.filter(task => {
    const dueDate = new Date(task.dueDate)
    return dueDate < now && task.status !== 'completed'
  })
}

export const getTasksByPriority = (tasks, priority) => {
  return tasks.filter(task => task.priority === priority)
}

export const getProjectTasksProgress = (tasks, projectId) => {
  const projectTasks = filterTasksByProject(tasks, projectId)
  return getTaskProgress(projectTasks)
}

export const getTasksCompletedToday = (tasks) => {
  const today = new Date().toISOString().split('T')[0]
  return tasks.filter(task => {
    const taskDate = new Date(task.updatedAt).toISOString().split('T')[0]
    return taskDate === today && task.status === 'completed'
  })
}

export const getTasksDueToday = (tasks) => {
  const today = new Date().toISOString().split('T')[0]
  return tasks.filter(task => {
    const taskDate = new Date(task.dueDate).toISOString().split('T')[0]
    return taskDate === today && task.status !== 'completed'
  })

export const getTasksByDate = (tasks, date) => {
  const targetDate = new Date(date).toISOString().split('T')[0]
  return tasks.filter(task => {
    const taskDate = new Date(task.dueDate).toISOString().split('T')[0]
    return taskDate === targetDate
  })
}

}