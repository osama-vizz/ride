import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/components/theme-provider'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-10 w-10 rounded-full border-2 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110"
          data-testid="button-theme-toggle"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 shadow-xl rounded-xl"
      >
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className={`flex items-center gap-2 cursor-pointer rounded-lg transition-colors ${
            theme === 'light' ? 'bg-blue-50 dark:bg-blue-950/50' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
          }`}
          data-testid="theme-option-light"
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-2 cursor-pointer rounded-lg transition-colors ${
            theme === 'dark' ? 'bg-blue-50 dark:bg-blue-950/50' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
          }`}
          data-testid="theme-option-dark"
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className={`flex items-center gap-2 cursor-pointer rounded-lg transition-colors ${
            theme === 'system' ? 'bg-blue-50 dark:bg-blue-950/50' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
          }`}
          data-testid="theme-option-system"
        >
          <Monitor className="h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}