const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
const COLORS = {
	basic_red: '#f44336',
	basic_green: '#47c387',
	basic_yellow: '#ffd600',
	basic_blue: '#1a55af',
	basic_light_blue: '#a0e8fe',
	basic_dark_blue: '#07275a',
	basic_grey: '#f4433641',
	dark_pink: '#e91e63',
	light_pink: '#ff7676',
	light_blue: '#00bcd4',
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)',
	grey_dark: '#343a40',
};
const idea_graph = document.getElementById('idea-flow-chart').getContext('2d');
const idea_stats = document.getElementById('idea-stats-chart').getContext('2d');
const labels = MONTHS.slice(0, 6);

//Graph
const data_graph = {
	labels: labels,
	datasets: [
		{
			label: 'Dataset 1',
			data: [65, 59, 80, 81, 56, 55, 40],
			borderColor: COLORS.basic_green,
			backgroundColor: COLORS.basic_green,
			lineTension: 0.4,
			radius: 3.5,
		},
		{
			label: 'Dataset 2',
			data: [25, 49, 30, 51, 56, 75, 50],
			borderColor: COLORS.basic_yellow,
			backgroundColor: COLORS.basic_yellow,
			lineTension: 0.4,
			radius: 3.5,
		},
	],
};
const config_graph = {
	type: 'line',
	data: data_graph,

	options: {
		responsive: true,
		aspectRatio: 2.5,
		plugins: {
			legend: {
				position: 'top',
				align: 'end',
				labels: {
					usePointStyle: true,
					boxWidth: 10,
					font: {
						size: 14,
					},
					color: '#bbb',
				},
			},
			title: {
				display: true,
				text: 'Ideasflow',
				position: 'top',
				align: 'start',
				font: {
					size: 24,
				},
				color: COLORS.grey_dark,
			},
		},
	},
};

//Stats
const data_stats = {
	labels: ['Red', 'Blue', 'Yellow'],
	datasets: [
		{
			label: 'My First Dataset',
			data: [300, 50, 100],
			backgroundColor: [
				'rgb(255, 99, 132)',
				'rgb(54, 162, 235)',
				'rgb(255, 205, 86)',
			],
			hoverOffset: 4,
		},
	],
};

const config_stats = {
	type: 'doughnut',
	data: data_stats,
	options: {
		responsive: true,
		aspectRatio: 2,
		plugins: {
			legend: {
				position: 'right',
				align: 'center',
				labels: {
					usePointStyle: true,
					boxWidth: 20,
					font: {
						size: 16,
					},
					color: '#bbb',
				},
			},
		},
	},
};

export default [
	new Chart(idea_graph, config_graph),
	new Chart(idea_stats, config_stats),
];
