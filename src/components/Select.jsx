
export function Select({selectName, selectId, options, handleSelect}) {
	return (
		<label>
			<select name={selectName} id={selectId} onChange={(event) => handleSelect(event.target.value)}>
				<option disabled={true} value="">
					--Выберите значение--
				</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>{option.name}</option>
				))}
			</select>
		</label>
	)
}
