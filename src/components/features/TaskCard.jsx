import { motion } from 'framer-motion'
import { format, isAfter, isBefore, startOfDay } from 'date-fns'
import ApperIcon from '../ApperIcon'
import { priorityConfig } from '../../constants/taskConfig'

const TaskCard = ({ task, onEdit }) => {
  const priority = priorityConfig.find(p => p.id === task.priority)
  const dueDate = new Date(task.dueDate)
  const today = startOfDay(new Date())
  
  const isOverdue = isBefore(dueDate, today) && task.status !== 'completed'
  const isDueToday = format(dueDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onEdit}
      className={`task-card ${isOverdue ? 'border-red-200 dark:border-red-800' : ''}`}
    >
      {/* Priority and Due Date */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`priority-indicator ${priority?.className}`} />
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {priority?.label}
          </span>
        </div>
        
        <div className={`text-xs px-2 py-1 rounded-full ${
          isOverdue 
            ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
            : isDueToday
            ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
        }`}>
          {format(dueDate, 'MMM dd')}
        </div>
      </div>

      {/* Task Title */}
      <h4 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
        {task.title}
      </h4>

      {/* Task Description */}
      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <ApperIcon name="Clock" size={12} />
          <span>{task.timeSpent}h</span>
        </div>
        
        <div className="flex items-center gap-1">
          {task.assignedTo && (
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-white">
                {task.assignedTo.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard