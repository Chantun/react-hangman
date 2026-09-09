export default function SecretLetter({ value, show, red }) {
	return (
		<span
			className="secret__letter"
			style={red ? { color: "#EC5D49" } : undefined}
		>
			{show ? value.toUpperCase() : ""}
		</span>
	);
}
