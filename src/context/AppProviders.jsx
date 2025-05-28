import { TaskProvider } from './TaskContext'
import { ProjectProvider } from './ProjectContext'

export const AppProviders = ({ children }) => (
  <TaskProvider>
    <ProjectProvider>
      {children}
    </ProjectProvider>
  </TaskProvider>
)