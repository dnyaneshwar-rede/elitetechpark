
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  // Handle theme toggle with user feedback
  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    
    // Show toast notification for theme change
    toast({
      title: `Theme Changed`,
      description: `Switched to ${newTheme} mode`,
      variant: "default",
      duration: 2000,
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      className="w-10 h-10 rounded-full transition-all duration-300 hover:bg-accent"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {/* Sun icon with animation */}
      <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      {/* Moon icon with animation */}
      <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
