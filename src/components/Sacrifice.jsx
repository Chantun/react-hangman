export default function Sacrifice({ value, color, backgroundColor, dead }) {
	return (
		<span
			className={`sacrifice--item${dead ? " lost" : ""}`}
			style={{ backgroundColor: backgroundColor, color: color }}
		>
			{value}
		</span>
	);
}
