import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Components
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './components/features/Dashboard'
import CalendarView from './components/features/CalendarView'


import TaskBoard from './components/features/TaskBoard'
import ProjectModal from './components/features/ProjectModal'

// Context
import { AppProviders } from './context/AppProviders'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [selectedProject, setSelectedProject] = useState('all')
  const [currentView, setCurrentView] = useState('dashboard')


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const openTaskModal = (task = null) => {
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  const closeTaskModal = () => {
    setIsTaskModalOpen(false)
    setEditingTask(null)
  }

  return (
    <AppProviders>
      <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
        <Header 
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onCreateTask={() => openTaskModal()}
          onCreateProject={() => setIsProjectModalOpen(true)}
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        
        <div className="flex">
          <Sidebar 
            isOpen={isSidebarOpen}
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
            currentView={currentView}
            onViewChange={setCurrentView}
          />

          
          <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
            <div className="p-6">
              {currentView === 'dashboard' ? (
                <Dashboard selectedProject={selectedProject} />
                <Dashboard selectedProject={selectedProject} />
              ) : currentView === 'tasks' ? (
                <TaskBoard 
                  selectedProject={selectedProject}
                  onEditTask={openTaskModal}
                />
              ) : currentView === 'calendar' ? (
                <CalendarView 
                  selectedProject={selectedProject}
                  onEditTask={openTaskModal}
                />
              ) : (
                <TaskBoard 
                  selectedProject={selectedProject}
                  onEditTask={openTaskModal}
                />
              )}

            </div>

            </div>

          </main>

          </main>
        </div>
        </div>


        {/* Modals */}
        {isTaskModalOpen && (
          <TaskModal
            isOpen={isTaskModalOpen}
            onClose={closeTaskModal}
            task={editingTask}
            selectedProject={selectedProject}
          />
        )}

        {isProjectModalOpen && (
          <ProjectModal
            isOpen={isProjectModalOpen}
            onClose={() => setIsProjectModalOpen(false)}
          />
        )}

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={isDarkMode ? 'dark' : 'light'}
          className="text-sm"
        />
      </div>
    </AppProviders>
  )
}

export default App