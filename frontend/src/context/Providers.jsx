// src/context/Providers.jsx
import { AuthProvider } from './AuthContext';
import { EngineerProvider } from './EngineerContext';
import { ProjectProvider } from './ProjectContext';
import { AssignmentProvider } from './AssignmentContext';


export function Providers({ children }) {
  return (
    <AuthProvider>
        <EngineerProvider>
          <ProjectProvider>
            <AssignmentProvider>
              {children}
            </AssignmentProvider>
          </ProjectProvider>
        </EngineerProvider>
    </AuthProvider>
  );
}
