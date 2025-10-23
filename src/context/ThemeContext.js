// src/context/ThemeContext.js
import { createContext, useState, useEffect } from 'react'

// 1. Create the context
const ThemeContext = createContext(null)

// 2. Create the provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [accentColor, setAccentColor] = useState('#63537d')
  const [fontPercentage, setFontPercentage] = useState(100)

  // Handles toggling dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((currentMode) => !currentMode)
  }

  // Side effects for theme
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    document.body.style.fontSize = `${fontPercentage}%`
  }, [isDarkMode, fontPercentage])

  // Provide both state and actions
  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        accentColor,
        fontPercentage,
        actions: {
          toggleDarkMode,
          updateAccentColor: setAccentColor,
          updateFontPercentage: setFontPercentage
        }
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
