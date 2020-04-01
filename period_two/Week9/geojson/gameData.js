const gameArea = {
	type: 'Polygon',
	coordinates: [
		[
			[12.544240951538086, 55.77546272327588],
			[12.561407089233397, 55.77589719045706],
			[12.57711410522461, 55.77729710731694],
			[12.57136344909668, 55.79525020217019],
			[12.544755935668944, 55.79886877565466],
			[12.544240951538086, 55.77546272327588]
		]
	]
};
const players = [
	{
		type: 'Feature',
		properties: {
			'marker-color': '#1de03a',
			'marker-size': 'medium',
			'marker-symbol': '',
			name: 'Spiller 1 (Inside)'
		},
		geometry: {
			type: 'Point',
			coordinates: [12.558746337890625, 55.78612990561603]
		}
	},
	{
		type: 'Feature',
		properties: {
			'marker-color': '#1de03a',
			'marker-size': 'medium',
			'marker-symbol': '',
			name: 'Spiller 2 (Inside)'
		},
		geometry: {
			type: 'Point',
			coordinates: [12.57411003112793, 55.77826253792186]
		}
	},
	{
		type: 'Feature',
		properties: {
			'marker-color': '#fd0006',
			'marker-size': 'medium',
			'marker-symbol': '',
			name: 'Spiller 3 (Outside)'
		},
		geometry: {
			type: 'Point',
			coordinates: [12.543811798095701, 55.77493170125483]
		}
	},
	{
		type: 'Feature',
		properties: {
			'marker-color': '#fd0006',
			'marker-size': 'medium',
			'marker-symbol': '',
			name: 'Spiller 4 (Outside)'
		},
		geometry: {
			type: 'Point',
			coordinates: [12.541236877441406, 55.79819333412856]
		}
	}
];

module.exports = {
	gameArea,
	players
};
