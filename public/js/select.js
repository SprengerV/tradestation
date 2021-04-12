const allPairs = ['BTC/USDT','XLM/USDT','DOGE/USDT','BNB/USDT','EDGLD/USDT',
	'VET/USDT','ETH/USDT','ADA/USDT','LTC/USDT','VTHO/USDT','ONE/USDT','SOL/USDT',
	'BAT/USDT','BCH/USDT','ETC/USDT','ONT/USDT','NEO/USDT','ZRX/USDT','ATOM/USDT',
	'STORJ/USDT','UNI/USDT','OXT/USDT','KNC/USDT','HNT/USDT','COMP/USDT','QTUM/USDT',
	'ZEN/USDT','MKR/USDT','PAXG/USDT'];
const selectForm = $('#selectForm');

const makeForm = (arr) => {
	for (const i in arr) {
		const pair = arr[i];
		const ticker = pair.split('/').join('').toLowerCase();
		const input = $('<input>');
		input
			.attr('type','checkbox')
			.attr('name', ticker)
			.addClass('pair')
			.val(ticker);
		const label = $('<label>');
		label
			.attr('for', ticker)
			.text(pair);
		const div = $('<div>');
		div
			.append(input, label)
			.addClass('selectPair')
			.css(`grid-column: ${i % 7} / ${(i % 7) + 1};
		grid-row: ${Math.floor(i % 7)} / (${Math.floor(i / 7) + 1};`); 
		selectForm.append(div);
	}	
}

$(document).ready(() => {
	makeForm(allPairs);
	selectForm.submit(event => {
		event.preventDefault();
		var checked = selectForm
			.serializeArray()
			.map(({ value }) => {
				return value
			});
		$.ajax({
			url: '/api/ticker/add',
			method: 'post',
			body: JSON.stringify(checked),
			header: { 'Content=Type': 'application/json' }
		}).then(res => {
			if (res.ok) hideForm()
			else displayError();
		});
	});	
});

