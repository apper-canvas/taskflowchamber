import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'

const Header = ({ isDarkMode, toggleDarkMode, toggleSidebar, onCreateTask, onCreateProject, currentView, onViewChange }) => {

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-40"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <ApperIcon name="Menu" size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">TaskFlow</h1>
          </div>
        </div>

          <div className="flex items-center gap-2 ml-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewChange('dashboard')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentView === 'dashboard'
                  ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <ApperIcon name="BarChart3" size={16} />
                <span>Dashboard</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewChange('tasks')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentView === 'tasks'
                  ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <ApperIcon name="CheckSquare" size={16} />
                <span>Tasks</span>
              </div>
            </motion.button>
          </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreateTask}
            className="btn-primary flex items-center gap-2"
          >
            <ApperIcon name="Plus" size={16} />
            <span className="hidden sm:inline">New Task</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreateProject}
            className="btn-secondary flex items-center gap-2"
          >
            <ApperIcon name="FolderPlus" size={16} />
            <span className="hidden sm:inline">Project</span>
          </motion.button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <ApperIcon 
              name={isDarkMode ? "Sun" : "Moon"} 
              size={20} 
              className="text-gray-600 dark:text-gray-400" 
            />
          </button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header