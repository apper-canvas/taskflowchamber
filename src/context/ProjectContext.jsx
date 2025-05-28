import { createContext, useContext, useReducer } from 'react'

const ProjectContext = createContext()

const projectReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload }
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] }
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id ? action.payload : project
        )
      }
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload)
      }
    default:
      return state
  }
}

const initialState = {
  projects: [
    {
      id: '1',
      name: 'Personal Tasks',
      description: 'Personal productivity and life tasks',
      color: '#3b82f6',
      createdAt: new Date(),
      ownerId: 'user1',
      members: ['user1'],
      isArchived: false
    },
    {
      id: '2',
      name: 'Work Projects',
      description: 'Professional development and work-related tasks',
      color: '#10b981',
      createdAt: new Date(),
      ownerId: 'user1',
      members: ['user1'],
      isArchived: false
    }
  ]
}

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState)

  return (
    <ProjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}