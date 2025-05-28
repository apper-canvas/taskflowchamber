import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import Chart from 'react-apexcharts'
import { useProject } from '../../context/ProjectContext'
import ApperIcon from '../ApperIcon'
import {
  calculateTaskCompletionRate,
  getTasksByStatus,
  getPriorityDistribution,
  calculateProjectProgress,
  getDailyProductivity,
  getProductivityInsights
} from '../../utils/dashboardUtils'
import { filterTasksByProject } from '../../utils/taskUtils'

const Dashboard = ({ selectedProject }) => {
  const { tasks } = useSelector(state => state.tasks)
  const { projects } = useProject()
  
  const filteredTasks = filterTasksByProject(tasks, selectedProject)
  const statusData = getTasksByStatus(filteredTasks)
  const priorityData = getPriorityDistribution(filteredTasks)
  const projectProgress = calculateProjectProgress(tasks, projects)
  const dailyProductivity = getDailyProductivity(filteredTasks)
  const insights = getProductivityInsights(filteredTasks)

  // Chart configurations
  const taskStatusChartOptions = {
    chart: {
      type: 'donut',
      background: 'transparent'
    },
    labels: ['To Do', 'In Progress', 'Completed'],
    colors: ['#94a3b8', '#f59e0b', '#10b981'],
    legend: {
      position: 'bottom',
      labels: {
        colors: '#6b7280'
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#ffffff']
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  const priorityChartOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
        columnWidth: '60%'
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#10b981', '#f59e0b', '#f97316', '#ef4444'],
    xaxis: {
      categories: ['Low', 'Medium', 'High', 'Urgent'],
      labels: {
        style: {
          colors: '#6b7280'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6b7280'
        }
      }
    },
    grid: {
      borderColor: '#e5e7eb'
    }
  }

  const dailyProductivityOptions = {
    chart: {
      type: 'area',
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#3b82f6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        colorStops: [
          {
            offset: 0,
            color: '#3b82f6',
            opacity: 0.4
          },
          {
            offset: 100,
            color: '#3b82f6',
            opacity: 0.1
          }
        ]
      }
    },
    xaxis: {
      categories: dailyProductivity.map(day => day.date),
      labels: {
        style: {
          colors: '#6b7280'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6b7280'
        }
      }
    },
    grid: {
      borderColor: '#e5e7eb'
    },
    tooltip: {
      theme: 'light'
    }
  }

  const taskStatusData = [statusData.todo, statusData['in-progress'], statusData.completed]
  const priorityChartData = [{
    name: 'Tasks',
    data: [priorityData.low, priorityData.medium, priorityData.high, priorityData.urgent]
  }]
  const dailyProductivityData = [{
    name: 'Completed Tasks',
    data: dailyProductivity.map(day => day.tasks)
  }]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Dashboard Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {selectedProject === 'all' ? 'All Projects' : projects.find(p => p.id === selectedProject)?.name || 'Overview'} - Productivity Insights
        </p>
      </motion.div>

      {/* Key Metrics Cards */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{insights.totalTasks}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <ApperIcon name="CheckSquare" size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{insights.completedTasks}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{insights.completionRate}% completion rate</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <ApperIcon name="CheckCircle" size={24} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{insights.inProgressTasks}</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <ApperIcon name="Clock" size={24} className="text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Time Spent</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{insights.totalTimeSpent.toFixed(1)}h</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Avg: {insights.averageTaskTime}h/task</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <ApperIcon name="Timer" size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Task Status Chart */}
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Status Distribution</h3>
          <Chart
            options={taskStatusChartOptions}
            series={taskStatusData}
            type="donut"
            height={300}
          />
        </motion.div>

        {/* Priority Distribution Chart */}
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Priority Distribution</h3>
          <Chart
            options={priorityChartOptions}
            series={priorityChartData}
            type="bar"
            height={300}
          />
        </motion.div>
      </div>

      {/* Daily Productivity Chart */}
      <motion.div 
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 mb-8"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">7-Day Productivity Trend</h3>
        <Chart
          options={dailyProductivityOptions}
          series={dailyProductivityData}
          type="area"
          height={300}
        />
      </motion.div>

      {/* Project Progress */}
      {selectedProject === 'all' && projectProgress.length > 0 && (
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Project Progress</h3>
          <div className="space-y-4">
            {projectProgress.map(project => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: project.color }}
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{project.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {project.completedTasks} of {project.totalTasks} tasks completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <motion.div 
                      className="h-2 rounded-full" 
                      style={{ backgroundColor: project.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[3rem]">
                    {project.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Dashboard
