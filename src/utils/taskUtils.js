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