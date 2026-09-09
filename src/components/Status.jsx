export default function Status({ type, sacrificeName, resultItem }) {
	const status = () => {
		if (type === "WIN") return "status--win";
		if (type === "LOSE") return "status--lose";
		if (type === "FAREWELL") return "status--farewell";
		return "hidden";
	};

	const title = () => {
		if (type === "WIN") return "¡Ganaste!";
		if (type === "LOSE") return "¡Juego terminado!";
		if (type === "FAREWELL") return `“Adiós, ${sacrificeName}” 🫡`;
		return "";
	};

	const subtitle = () => {
		if (type === "WIN") return `¡Salvaste ${resultItem}! 🎉`;
		if (type === "LOSE") return `Perdiste ${resultItem} para siempre... 😭`;
		return "";
	};

	return (
		<section className={`status ${status()}`}>
			<h2 className="status__title">{title()}</h2>
			{subtitle() !== "" ? (
				<p className="status__subtitle">{subtitle()}</p>
			) : null}
		</section>
	);
}
