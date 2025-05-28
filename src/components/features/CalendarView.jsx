import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths } from 'date-fns'
import { filterTasksByProject, getTasksByDate } from '../../utils/taskUtils'
import { generateCalendarGrid, getTasksForDate } from '../../utils/calendarUtils'
import { useProject } from '../../context/ProjectContext'
import ApperIcon from '../ApperIcon'
import TaskCard from './TaskCard'

const CalendarView = ({ selectedProject, onEditTask }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const { tasks } = useSelector(state => state.tasks)
  const { projects } = useProject()

  // Filter tasks based on selected project
  const filteredTasks = filterTasksByProject(tasks, selectedProject)

  // Generate calendar grid
  const calendarDays = generateCalendarGrid(currentDate)

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  // Get tasks for a specific date
  const getTasksForDay = (date) => {
    return getTasksForDate(filteredTasks, date)
  }

  // Get project color for task
  const getProjectColor = (projectId) => {
    const project = projects.find(p => p.id === projectId)
    return project ? project.color : '#6b7280'
  }

  // Priority colors
  const getPriorityColor = (priority) => {
    const colors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#f97316',
      urgent: '#ef4444'
    }
    return colors[priority] || colors.medium
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Calendar Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {format(currentDate, 'MMMM yyyy')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredTasks.length} tasks {selectedProject !== 'all' ? 'in project' : 'total'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={goToToday}
            className="btn-secondary flex items-center gap-2"
          >
            <ApperIcon name="Calendar" size={16} />
            Today
          </button>
          
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToPreviousMonth}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ApperIcon name="ChevronLeft" size={20} className="text-gray-600 dark:text-gray-400" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ApperIcon name="ChevronRight" size={20} className="text-gray-600 dark:text-gray-400" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Calendar Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="calendar-grid bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* Days of Week Header */}
        <div className="calendar-header grid grid-cols-7 bg-gray-50 dark:bg-gray-900">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="calendar-day-header p-4 text-center font-semibold text-gray-700 dark:text-gray-300">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="calendar-body grid grid-cols-7">
          {calendarDays.map((date, index) => {
            const dayTasks = getTasksForDay(date)
            const isCurrentMonth = isSameMonth(date, currentDate)
            const isTodayDate = isToday(date)
            const isSelected = selectedDate && isSameDay(date, selectedDate)

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                onClick={() => setSelectedDate(date)}
                className={`calendar-day-cell min-h-32 p-2 border-b border-r border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-200 ${
                  isCurrentMonth
                    ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750'
                    : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600'
                } ${
                  isTodayDate
                    ? 'ring-2 ring-primary-500 ring-opacity-50'
                    : ''
                } ${
                  isSelected
                    ? 'bg-primary-50 dark:bg-primary-900/20'
                    : ''
                }`}
              >
                {/* Date Number */}
                <div className={`text-sm font-medium mb-1 ${
                  isTodayDate
                    ? 'text-primary-600 dark:text-primary-400'
                    : isCurrentMonth
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-400 dark:text-gray-600'
                }`}>
                  {format(date, 'd')}
                </div>

                {/* Task Events */}
                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((task, taskIndex) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.01) + (taskIndex * 0.05) }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onEditTask(task)
                      }}
                      className="calendar-task-event px-2 py-1 rounded text-xs font-medium cursor-pointer transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: `${getPriorityColor(task.priority)}20`,
                        borderLeft: `3px solid ${getPriorityColor(task.priority)}`,
                        color: getPriorityColor(task.priority)
                      }}
                    >
                      <div className="truncate">{task.title}</div>
                    </motion.div>
                  ))}
                  
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
                      +{dayTasks.length - 3} more
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Selected Date Details */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tasks for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </h3>
              <button
                onClick={() => setSelectedDate(null)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ApperIcon name="X" size={16} className="text-gray-500" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getTasksForDay(selectedDate).map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="transform transition-all duration-200 hover:scale-105"
                >
                  <TaskCard task={task} onEdit={() => onEditTask(task)} />
                </motion.div>
              ))}
            </div>
            
            {getTasksForDay(selectedDate).length === 0 && (
              <div className="text-center py-8 text-gray-400 dark:text-gray-600">
                <div className="text-4xl mb-2">📅</div>
                <p>No tasks scheduled for this date</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default CalendarView