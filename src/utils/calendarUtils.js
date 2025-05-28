import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO, isValid } from 'date-fns'

/**
 * Generate calendar grid for a given month
 * @param {Date} date - The date to generate calendar for
 * @returns {Date[]} Array of dates for the calendar grid
 */
export const generateCalendarGrid = (date) => {
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)
  
  return eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  })
}

/**
 * Get tasks for a specific date
 * @param {Array} tasks - Array of tasks
 * @param {Date} date - The date to filter tasks for
 * @returns {Array} Tasks for the specified date
 */
export const getTasksForDate = (tasks, date) => {
  return tasks.filter(task => {
    if (!task.dueDate) return false
    
    let taskDate
    if (typeof task.dueDate === 'string') {
      taskDate = parseISO(task.dueDate)
    } else {
      taskDate = task.dueDate
    }
    
    return isValid(taskDate) && isSameDay(taskDate, date)
  })
}

/**
 * Group tasks by date
 * @param {Array} tasks - Array of tasks
 * @returns {Object} Tasks grouped by date string (YYYY-MM-DD)
 */
export const groupTasksByDate = (tasks) => {
  const grouped = {}
  
  tasks.forEach(task => {
    if (!task.dueDate) return
    
    let taskDate
    if (typeof task.dueDate === 'string') {
      taskDate = parseISO(task.dueDate)
    } else {
      taskDate = task.dueDate
    }
    
    if (isValid(taskDate)) {
      const dateKey = taskDate.toISOString().split('T')[0]
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(task)
    }
  })
  
  return grouped
}

/**
 * Get tasks within a date range
 * @param {Array} tasks - Array of tasks
 * @param {Date} startDate - Start date of range
 * @param {Date} endDate - End date of range
 * @returns {Array} Tasks within the date range
 */
export const getTasksInDateRange = (tasks, startDate, endDate) => {
  return tasks.filter(task => {
    if (!task.dueDate) return false
    
    let taskDate
    if (typeof task.dueDate === 'string') {
      taskDate = parseISO(task.dueDate)
    } else {
      taskDate = task.dueDate
    }
    
    if (!isValid(taskDate)) return false
    
    return taskDate >= startDate && taskDate <= endDate
  })
}

/**
 * Check if a date has any tasks
 * @param {Array} tasks - Array of tasks
 * @param {Date} date - The date to check
 * @returns {boolean} True if date has tasks
 */
export const dateHasTasks = (tasks, date) => {
  return getTasksForDate(tasks, date).length > 0
}

/**
 * Get calendar statistics for a month
 * @param {Array} tasks - Array of tasks
 * @param {Date} date - The month date
 * @returns {Object} Calendar statistics
 */
export const getCalendarStats = (tasks, date) => {
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)
  const monthTasks = getTasksInDateRange(tasks, monthStart, monthEnd)
  
  const stats = {
    totalTasks: monthTasks.length,
    completedTasks: monthTasks.filter(task => task.status === 'completed').length,
    overdueTasks: monthTasks.filter(task => {
      if (!task.dueDate || task.status === 'completed') return false
      
      let taskDate
      if (typeof task.dueDate === 'string') {
        taskDate = parseISO(task.dueDate)
      } else {
        taskDate = task.dueDate
      }
      
      return isValid(taskDate) && taskDate < new Date()
    }).length,
    upcomingTasks: monthTasks.filter(task => {
      if (!task.dueDate || task.status === 'completed') return false
      
      let taskDate
      if (typeof task.dueDate === 'string') {
        taskDate = parseISO(task.dueDate)
      } else {
        taskDate = task.dueDate
      }
      
      return isValid(taskDate) && taskDate >= new Date()
    }).length
  }
  
  stats.completionRate = stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0
  
  return stats
}

/**
 * Get tasks by priority for a specific date
 * @param {Array} tasks - Array of tasks
 * @param {Date} date - The date to filter tasks for
 * @returns {Object} Tasks grouped by priority
 */
export const getTasksByPriorityForDate = (tasks, date) => {
  const dateTasks = getTasksForDate(tasks, date)
  
  return {
    urgent: dateTasks.filter(task => task.priority === 'urgent'),
    high: dateTasks.filter(task => task.priority === 'high'),
    medium: dateTasks.filter(task => task.priority === 'medium'),
    low: dateTasks.filter(task => task.priority === 'low')
  }
}