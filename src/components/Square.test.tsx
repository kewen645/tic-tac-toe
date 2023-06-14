import { render, screen, within } from '@testing-library/react'
import user from '@testing-library/user-event'
import Square from './Square'

describe('Square Component', () => {
	test('renders correctly', () => {
		const handleClickFn = jest.fn()
		render(<Square handleClick={handleClickFn} value={'O'} />)
		const buttonElement = screen.getByRole('button')
		expect(buttonElement).toBeInTheDocument()
	})

	test('square is clicked', async () => {
		const handleClickFn = jest.fn()
		user.setup()
		render(<Square handleClick={handleClickFn} value={null} />)
		const buttonElement = screen.getByRole('button')
		await user.click(buttonElement)
		expect(handleClickFn).toHaveBeenCalled()
	})
})
