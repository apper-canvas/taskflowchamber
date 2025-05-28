export const calculateTaskCompletionRate = (tasks) => {
  if (tasks.length === 0) return 0
  const completed = tasks.filter(task => task.status === 'completed').length
  return Math.round((completed / tasks.length) * 100)
}

export const getTasksByStatus = (tasks) => {
  const statusCounts = {
    'todo': 0,
    'in-progress': 0,
    'completed': 0
  }
  
  tasks.forEach(task => {
    if (statusCounts.hasOwnProperty(task.status)) {
      statusCounts[task.status]++
    }
  })
  
  return statusCounts
}

export const getPriorityDistribution = (tasks) => {
  const priorityCounts = {
    'low': 0,
    'medium': 0,
    'high': 0,
    'urgent': 0
  }
  
  tasks.forEach(task => {
    if (priorityCounts.hasOwnProperty(task.priority)) {
      priorityCounts[task.priority]++
    }
  })
  
  return priorityCounts
}

export const calculateProjectProgress = (tasks, projects) => {
  return projects.map(project => {
    const projectTasks = tasks.filter(task => task.projectId === project.id)
    const completedTasks = projectTasks.filter(task => task.status === 'completed').length
    const progress = projectTasks.length > 0 ? Math.round((completedTasks / projectTasks.length) * 100) : 0
    
    return {
      id: project.id,
      name: project.name,
      color: project.color,
      progress,
      totalTasks: projectTasks.length,
      completedTasks
    }
  })
}

export const getTotalTimeSpent = (tasks) => {
  return tasks.reduce((total, task) => total + (task.timeSpent || 0), 0)
}

export const getAverageTaskTime = (tasks) => {
  const completedTasks = tasks.filter(task => task.status === 'completed' && task.timeSpent > 0)
  if (completedTasks.length === 0) return 0
  
  const totalTime = completedTasks.reduce((total, task) => total + task.timeSpent, 0)
  return Math.round((totalTime / completedTasks.length) * 10) / 10
}

export const getDailyProductivity = (tasks, days = 7) => {
  const today = new Date()
  const productivity = []
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    
    const dayTasks = tasks.filter(task => {
      const taskDate = new Date(task.updatedAt).toISOString().split('T')[0]
      return taskDate === dateStr && task.status === 'completed'
    })
    
    productivity.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      tasks: dayTasks.length,
      timeSpent: dayTasks.reduce((total, task) => total + (task.timeSpent || 0), 0)
    })
  }
  
  return productivity
}

export const getProductivityInsights = (tasks) => {
  const total = tasks.length
  const completed = tasks.filter(task => task.status === 'completed').length
  const inProgress = tasks.filter(task => task.status === 'in-progress').length
  const overdue = tasks.filter(task => {
    const dueDate = new Date(task.dueDate)
    return dueDate < new Date() && task.status !== 'completed'
  }).length
  
  const totalTime = getTotalTimeSpent(tasks)
  const avgTime = getAverageTaskTime(tasks)
  
  return {
    totalTasks: total,
    completedTasks: completed,
    inProgressTasks: inProgress,
    overdueTasks: overdue,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    totalTimeSpent: totalTime,
    averageTaskTime: avgTime
  }
}
