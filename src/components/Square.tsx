type SquareProps = {
	value: 'O' | 'X' | null
	handleClick: () => void
}

const Square = (props: SquareProps) => {
	const { value, handleClick } = props
	return (
		<button className='square' onClick={handleClick}>
			<span style={value === 'O' ? { color: 'red' } : { color: 'blue' }}>{value}</span>
		</button>
	)
}

export default Square
