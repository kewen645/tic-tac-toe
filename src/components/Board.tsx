import { useState } from 'react'
import Square from './Square'

export const computeWinner = (squares: (string | null)[]) => {
	const winStrategy = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	for (let i = 0; i < winStrategy.length; i++) {
		const [a, b, c] = winStrategy[i]
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a]
		}
	}
	return null
}

const Board = () => {
	// check persistence
	let historySquare = null
	let historyStatus = null

	if (localStorage.getItem('record')) {
		historySquare = JSON.parse(localStorage.getItem('record')!)
	}

	if (localStorage.getItem('status')) {
		historyStatus = JSON.parse(localStorage.getItem('status')!)
	}

	// O is the first player which means true and vice versa.
	const [next, setNext] = useState(historyStatus || true)
	const [squares, setSquares] = useState(historySquare || Array(9).fill(null))

	const handleClick = (idx: number) => {
		if (squares[idx] || computeWinner(squares)) return
		const newSquare = [...squares]
		if (next) newSquare[idx] = 'O'
		else newSquare[idx] = 'X'
		setSquares(newSquare)
		setNext(!next)
		// persist for refresh
		localStorage.setItem('record', JSON.stringify(newSquare))
		localStorage.setItem('status', JSON.stringify(!next))
	}

	let status
	const winner = computeWinner(squares)
	if (winner) status = 'Winner: ' + winner
	else status = 'Next Player: ' + (next ? 'O' : 'X')

	const reset = () => {
		setNext(true)
		setSquares(Array(9).fill(null))
		localStorage.removeItem('record')
		localStorage.removeItem('status')
	}

	return (
		<>
			<div className='board-row'>
				{squares.map((square: 'O' | 'X' | null, index: number) => (
					<Square key={index} value={square} handleClick={() => handleClick(index)} />
				))}
			</div>
			<div className='status'>{status}</div>
			<button onClick={reset}>Play Again!</button>
		</>
	)
}

export default Board
