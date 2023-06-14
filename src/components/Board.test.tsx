import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import Board from './Board'
import { computeWinner } from './Board'

describe('Board Component init', () => {
	test('renders correctly', () => {
		render(<Board />)
		const nextPlayerElement = screen.getByText(/next player: o/i)
		const resetButtonElement = screen.getByRole('button', { name: /play again!/i })
		expect(nextPlayerElement).toBeInTheDocument()
		expect(resetButtonElement).toBeInTheDocument()
	})

	test('predicts winner correctly', () => {
		const squares = ['O', 'O', 'O', 'O', 'X', 'X', null, null, null]
		const res = computeWinner(squares)
		expect(res).toBe('O')
	})
})

describe('Board Component functionality', () => {
	beforeEach(() => {
		localStorage.setItem('record', JSON.stringify([null, null, null, null, null, null, null, 'O', null]))
		localStorage.setItem('status', 'false')
	})

	test('resumes game if localStorage data is present', () => {
		render(<Board />)
		let record = JSON.parse(localStorage.getItem('record')!)
		let status = JSON.parse(localStorage.getItem('status')!)
		expect(record).toEqual([null, null, null, null, null, null, null, 'O', null])
		expect(status).toBeFalsy
	})

	test('click reset to restart the game', async () => {
		user.setup()
		const { container } = render(<Board />)
		let statusElement = container.querySelector('.status')
		const resetButtonElement = screen.getByRole('button', { name: /play again!/i })
		await user.click(resetButtonElement)
		expect(statusElement).toHaveTextContent('Next Player: O')
		let record = JSON.parse(localStorage.getItem('record')!)
		let status = JSON.parse(localStorage.getItem('status')!)
		expect(record).toBeNull()
		expect(status).toBeNull()
	})
})
