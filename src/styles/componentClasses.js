export const buttonClasses = {
  base: 'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
  secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 focus:ring-gray-500',
  danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
}

export const cardClasses = {
  base: 'bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700',
  hover: 'hover:shadow-card hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200',
  padding: 'p-6',
  interactive: 'cursor-pointer transform hover:scale-105 transition-transform duration-200'
}

export const inputClasses = {
  base: 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200',
  default: 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100',
  error: 'border-red-300 focus:ring-red-500 bg-red-50 dark:bg-red-900/20',
  success: 'border-green-300 focus:ring-green-500 bg-green-50 dark:bg-green-900/20'
}

export const badgeClasses = {
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  priority: {
    low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    urgent: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  },
  status: {
    todo: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    archived: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
  }
}