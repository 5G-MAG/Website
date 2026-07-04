import {createContext, useContext} from 'react';

const SidebarToggleContext = createContext(null);

export function useSidebarToggle() {
  return useContext(SidebarToggleContext);
}

export default SidebarToggleContext;
