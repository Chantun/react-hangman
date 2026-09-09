import { useState } from "react";
import { sacrificeSets } from "./sacrifices";
import words from "./words.txt?raw";
import Status from "./components/Status";
import Sacrifice from "./components/Sacrifice";
import SecretLetter from "./components/SecretLetter";
import KeyboardLetter from "./components/KeyboardLetter";
import Confetti from "react-confetti";

function removeAccents(word) {
	return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getRandomWord() {
	const filteredWords = words
		.split("\n")
		.map((word) => word.trim().toLowerCase())
		.filter(Boolean)
		.map(removeAccents)
		.filter((word) => word.length >= 5 && word.length <= 12);

	return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function getRandomSacrificeSet() {
	return sacrificeSets[Math.floor(Math.random() * sacrificeSets.length)];
}

function pickRandomItem(items) {
	return items[Math.floor(Math.random() * items.length)];
}

export default function Hangman() {
	// State values
	const [currentWord, setWord] = useState(() => getRandomWord());
	const [guessedLetters, setGuess] = useState([]);
	const [sacrifices, setSacrifices] = useState(() => getRandomSacrificeSet());
	const [resultItem, setResultItem] = useState(() =>
		pickRandomItem(sacrifices.items),
	);

	// Derives values
	const wrongGuessCount = guessedLetters.filter(
		(letter) => !currentWord.includes(letter),
	).length;
	const isGameWon = currentWord
		.split("")
		.every((letter) => guessedLetters.includes(letter));
	const isGameLost = wrongGuessCount >= sacrifices.items.length;
	const isGameOver = isGameWon || isGameLost;

	// Static values
	const alphabet = "abcdefghijklmnñopqrstuvwxyz";

	const secretLetters = currentWord
		.split("")
		.map((letter, index) => (
			<SecretLetter
				key={index}
				value={letter}
				show={guessedLetters.includes(letter) || isGameOver}
				red={isGameLost && !guessedLetters.includes(letter)}
			/>
		));

	const keyboard = alphabet.split("").map((letter) => {
		const isGuessed = guessedLetters.includes(letter);
		const isCorrect = isGuessed && currentWord.includes(letter);
		const isWrong = isGuessed && !currentWord.includes(letter);

		const className =
			`keyboard__letter ${isCorrect ? "keyboard__letter--correct" : ""} ${isWrong ? "keyboard__letter--wrong" : ""}`.trim();

		return (
			<KeyboardLetter
				className={className}
				key={letter}
				value={letter}
				setGuess={setGuess}
				isGameOver={isGameOver}
			/>
		);
	});

	const sacrificeElements = sacrifices.items.map((item, index) => (
		<Sacrifice
			key={item}
			value={item}
			color={sacrifices.color}
			backgroundColor={sacrifices.backgroundColor}
			dead={wrongGuessCount >= index + 1}
		/>
	));

	function handleReset() {
		const nextSet = getRandomSacrificeSet();
		setWord(getRandomWord());
		setGuess([]);
		setSacrifices(nextSet);
		setResultItem(pickRandomItem(nextSet.items));
	}

	return (
		<>
			{isGameWon ? <Confetti /> : undefined}
			<main>
				<header>
					<h1 className="title">El Ahorcado</h1>
					<p className="description">
						Adivina la palabra en menos de 8 intentos para no perder tus cosas
						favoritas.
					</p>
				</header>
				<Status
					type={isGameWon ? "WIN" : isGameLost ? "LOSE" : "FAREWELL"}
					sacrificeName={sacrifices.name}
					resultItem={resultItem}
				/>
				<section className="sacrifices__container">{sacrificeElements}</section>
				<section className="word">{secretLetters}</section>
				<section className="keyboard">{keyboard}</section>
				{isGameOver ? (
					<button className="bottom__button" onClick={() => handleReset()}>
						Nueva partida
					</button>
				) : undefined}
			</main>
		</>
	);
}
