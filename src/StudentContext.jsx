
import { createContext, useContext } from 'react';

// Create Context to share student simulation results
export const StudentContext = createContext();

// Custom hook to access student data
export function useStudentContext() {
  return useContext(StudentContext);
}
