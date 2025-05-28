import { format, isToday, isTomorrow, isYesterday, differenceInDays } from 'date-fns'

export const formatTaskDate = (date) => {
  if (!date) return ''
  
  const taskDate = new Date(date)
  
  if (isToday(taskDate)) {
    return 'Today'
  } else if (isTomorrow(taskDate)) {
    return 'Tomorrow'
  } else if (isYesterday(taskDate)) {
    return 'Yesterday'
  } else {
    const daysDiff = differenceInDays(taskDate, new Date())
    if (Math.abs(daysDiff) <= 7) {
      return format(taskDate, 'EEEE')
    } else {
      return format(taskDate, 'MMM dd')
    }
  }
}

export const isTaskOverdue = (dueDate, status) => {
  if (!dueDate || status === 'completed' || status === 'archived') {
    return false
  }
  
  return new Date(dueDate) < new Date()
}

export const getTaskDateStatus = (dueDate) => {
  if (!dueDate) return null
  
  const taskDate = new Date(dueDate)
  const today = new Date()
  
  if (isToday(taskDate)) {
    return 'due-today'
  } else if (taskDate < today) {
    return 'overdue'
  } else if (isTomorrow(taskDate)) {
    return 'due-tomorrow'
  } else {
    return 'upcoming'
  }
}