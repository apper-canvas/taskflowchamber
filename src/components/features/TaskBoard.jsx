import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { updateTaskStatus } from '../../store/tasksSlice'
import TaskCard from './TaskCard'
import { taskStatusConfig } from '../../constants/taskConfig'

const TaskBoard = ({ selectedProject, onEditTask }) => {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.tasks)

  // Filter tasks based on selected project
  const filteredTasks = selectedProject === 'all' 
    ? tasks 
    : tasks.filter(task => task.projectId === selectedProject)

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, status) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('taskId')
    dispatch(updateTaskStatus({ taskId, status }))
  }

  const getTasksByStatus = (status) => {
    return filteredTasks.filter(task => task.status === status)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {taskStatusConfig.map((column) => (
        <motion.div
          key={column.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: column.id === 'todo' ? 0 : column.id === 'in-progress' ? 0.1 : column.id === 'completed' ? 0.2 : 0.3 }}
          className="status-column"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${column.color}`} />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {column.title}
            </h3>
            <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
              {getTasksByStatus(column.id).length}
            </span>
          </div>

          <div className="space-y-3">
            {getTasksByStatus(column.id).map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
              >
                <TaskCard 
                  task={task} 
                  onEdit={() => onEditTask(task)}
                />
              </motion.div>
            ))}
          </div>

          {getTasksByStatus(column.id).length === 0 && (
            <div className="text-center py-8 text-gray-400 dark:text-gray-600">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-sm">No tasks yet</p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default TaskBoard