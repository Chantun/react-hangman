export default function SecretLetter({
	className,
	value,
	setGuess,
	isGameOver,
}) {
	function handleGuess(letter) {
		setGuess((prevGuess) =>
			prevGuess.includes(letter) ? prevGuess : [...prevGuess, letter],
		);
	}

	return (
		<button
			className={className}
			style={isGameOver ? { cursor: "default" } : undefined}
			onClick={() => (!isGameOver ? handleGuess(value) : undefined)}
		>
			{value.toUpperCase()}
		</button>
	);
}
