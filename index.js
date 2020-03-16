// Defining variables
[ input, form ] = [ document.querySelector('.search'), document.querySelector('.form') ];

// Getting DOM elements
[ DomPrice, DomHigh, DomLow, DomSymbol, DomChange, DomChangePercent, DomPreviousClose, DomLastDay, DomOpen, DomAll] = [
	document.querySelector('.price'),
	document.querySelector('.high'),
	document.querySelector('.low'),
	document.querySelector('.symbol'),
	document.querySelector('.change'),
	document.querySelector('.changePercent'),
	document.querySelector('.previousClose'),
	document.querySelector('.lastDay'),
	document.querySelector('.open'),
	document.getElementById('stock-info')
];

// Function that gets stock and renders data on page
async function getStock() {
	// Fetch
	await fetch(endpoint)
		.then((response) => response.json())
		.then((datas) => {
			console.log(datas);
			console.log(datas['Global Quote']);
			const data = datas['Global Quote'];
			const symbol = data['01. symbol'];
			const price = Math.floor(data['05. price'] * 100) / 100 + '$';
			const highestToday = Math.floor(data['03. high'] * 100) / 100 + '$';
			const lowestToday = Math.floor(data['04. low'] * 100) / 100 + '$';
			const open = Math.floor(data['02. open'] * 100) / 100 + '$';
			const change = Math.floor(data['09. change'] * 100) / 100;
			const changePercent = data['10. change percent'];
			const lastTradingDay = data['07. latest trading day'];
			const previousClose = Math.floor(data['08. previous close'] * 100) / 100 + '$';

			// Render data
			DomPrice.innerHTML = price;
			DomSymbol.innerHTML = symbol;
			DomChange.innerHTML = change + '$';
			DomChangePercent.innerHTML = changePercent;
			DomHigh.innerHTML = `<span>Highest today:</span> ${highestToday}`;
			DomLow.innerHTML = `<span>Lowest today:</span> ${lowestToday}`;
			DomPreviousClose.innerHTML = `<span>Previous close:</span> ${previousClose}`;
			DomLastDay.innerHTML = `<span>Last trading day:</span> ${lastTradingDay}`;
			DomOpen.innerHTML = `<span>Opened at:</span> ${open}`;


            // Check if stock price gets or loses, adding color to it
			if (change > 0) {
				DomChange.setAttribute('id', 'plus');
				DomChangePercent.setAttribute('id', 'plus');
				DomChange.innerHTML = `+${change}$`;
				DomChangePercent.innerHTML = '+' + changePercent;
			} else if (change < 0) {
				DomChange.setAttribute('id', 'minus');
				DomChangePercent.setAttribute('id', 'minus');
			} else {
				DomChange.setAttribute('id', 'noChange');
				DomChangePercent.setAttribute('id', 'noChange');
			}
		})
		.catch(DomPrice.innerHTML = `${search} is not valid symbol / try tsla`);

    // Check for submit on search form
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		search = input.value;
		input.value = '';

        // Change endpoint url
        endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${search}&apikey=4YYSL2BSK1DK76P1`;
        // Call again getStock function with edited endpoint now
		getStock();
		console.clear();
	});
}

form.addEventListener('submit', (event) => {
	event.preventDefault();
	search = input.value;
	input.value = '';

	// Change endpoint url
	endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${search}&apikey=4YYSL2BSK1DK76P1`;
	// Call again getStock function with edited endpoint now
	getStock();
	console.clear();
});

