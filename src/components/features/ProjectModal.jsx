import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProject } from '../../context/ProjectContext'
import { toast } from 'react-toastify'
import ApperIcon from '../ApperIcon'
import { projectColors } from '../../constants/projectConfig'
import { generateId } from '../../utils/idUtils'

const ProjectModal = ({ isOpen, onClose, project }) => {
  const { dispatch } = useProject()
  
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    color: project?.color || projectColors[0]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Please enter a project name')
      return
    }

    const projectData = {
      ...formData,
      updatedAt: new Date().toISOString()
    }

    if (project) {
      dispatch({ type: 'UPDATE_PROJECT', payload: { ...project, ...projectData } })
      toast.success('Project updated successfully')
    } else {
      dispatch({ 
        type: 'ADD_PROJECT', 
        payload: {
          ...projectData,
          id: generateId(),
          createdAt: new Date().toISOString(),
          ownerId: 'user1',
          members: ['user1'],
          isArchived: false
        }
      })
      toast.success('Project created successfully')
    }

    onClose()
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="modal-content max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {project ? 'Edit Project' : 'Create New Project'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <ApperIcon name="X" size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="input-field"
                  placeholder="Enter project name..."
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Describe the project..."
                />
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Color
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {projectColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleInputChange('color', color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        formData.color === color
                          ? 'border-gray-400 dark:border-gray-500 scale-110'
                          : 'border-gray-200 dark:border-gray-600 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {project ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectModal