import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from '../../frontend/app/components/ui/ThemeToggle'
import { ThemeProvider } from '../../frontend/app/contexts/ThemeContext'

// Mock theme context
const mockToggleTheme = vi.fn()

vi.mock('../../frontend/app/contexts/ThemeContext', async () => {
  const actual = await vi.importActual('../../frontend/app/contexts/ThemeContext') as any
  return {
    ...actual,
    useTheme: () => ({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    }),
  }
})

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  )
}

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    mockToggleTheme.mockClear()
  })

  it('renders with default props', () => {
    renderWithTheme(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('theme-toggle--md')
    expect(button).toHaveClass('theme-toggle--button')
  })

  it('shows correct content for light theme', () => {
    renderWithTheme(<ThemeToggle />)
    
    expect(screen.getByText('🌙')).toBeInTheDocument()
    expect(screen.getByText('Dark')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  it('applies correct size classes', () => {
    const { rerender } = renderWithTheme(<ThemeToggle size="sm" />)
    expect(screen.getByRole('button')).toHaveClass('theme-toggle--sm')

    rerender(
      <ThemeProvider>
        <ThemeToggle size="lg" />
      </ThemeProvider>
    )
    expect(screen.getByRole('button')).toHaveClass('theme-toggle--lg')
  })

  it('applies correct variant classes', () => {
    const { rerender } = renderWithTheme(<ThemeToggle variant="button" />)
    expect(screen.getByRole('button')).toHaveClass('theme-toggle--button')

    rerender(
      <ThemeProvider>
        <ThemeToggle variant="icon" />
      </ThemeProvider>
    )
    expect(screen.getByRole('button')).toHaveClass('theme-toggle--icon')
  })

  it('hides label when showLabel is false', () => {
    renderWithTheme(<ThemeToggle showLabel={false} />)
    
    expect(screen.getByText('🌙')).toBeInTheDocument()
    expect(screen.queryByText('Dark')).not.toBeInTheDocument()
  })

  it('hides label for icon variant regardless of showLabel', () => {
    renderWithTheme(<ThemeToggle variant="icon" showLabel={true} />)
    
    expect(screen.getByText('🌙')).toBeInTheDocument()
    expect(screen.queryByText('Dark')).not.toBeInTheDocument()
  })

  it('calls toggleTheme when clicked', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ThemeToggle />)
    
    await user.click(screen.getByRole('button'))
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    renderWithTheme(<ThemeToggle className="custom-theme-toggle" />)
    expect(screen.getByRole('button')).toHaveClass('custom-theme-toggle')
  })

  it('forwards additional props', () => {
    renderWithTheme(<ThemeToggle data-testid="theme-toggle" />)
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('has accessible title attribute', () => {
    renderWithTheme(<ThemeToggle />)
    expect(screen.getByRole('button')).toHaveAttribute('title', 'Switch to dark mode')
  })
})