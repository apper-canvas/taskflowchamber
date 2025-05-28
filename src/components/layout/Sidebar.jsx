import { motion, AnimatePresence } from 'framer-motion'
import { useProject } from '../../context/ProjectContext'
import ApperIcon from '../ApperIcon'

const Sidebar = ({ isOpen, selectedProject, onSelectProject }) => {
  const { projects } = useProject()

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -320, opacity: 0 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed left-0 top-16 w-80 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-30 overflow-y-auto"
        >
          <div className="p-6">
            {/* Quick Stats */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Overview</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">Total Tasks</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">8</div>
                  <div className="text-xs text-green-600 dark:text-green-400">Completed</div>
                </div>
              </div>
            </motion.div>

            {/* Project Filter */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Projects</h2>
              
              <div className="space-y-2">
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => onSelectProject('all')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                    selectedProject === 'all'
                      ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <ApperIcon name="Inbox" size={18} />
                  <span className="font-medium">All Tasks</span>
                </motion.button>

                {projects.map((project) => (
                  <motion.button
                    key={project.id}
                    whileHover={{ x: 4 }}
                    onClick={() => onSelectProject(project.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                      selectedProject === project.id
                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="font-medium">{project.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Filters</h2>
              
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200">
                  <ApperIcon name="Clock" size={18} className="text-orange-500" />
                  <span>Due Today</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200">
                  <ApperIcon name="AlertTriangle" size={18} className="text-red-500" />
                  <span>High Priority</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200">
                  <ApperIcon name="CheckCircle" size={18} className="text-green-500" />
                  <span>Completed</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

export default Sidebar