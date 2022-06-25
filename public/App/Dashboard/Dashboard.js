import Ideas from '../Idea/ideas.js';
import Idea_Chart from '../Components/IChart.js';
import Sidebar from '../Components/Sidebar.js';
import Tab from '../Components/Tab.js';
import Insights from '../Components/Insights/Insights.js';
import Snackbar from '../Components/snackBar.js';
import request from '../Utils/requests.js';
import Sidebox from '../Components/sidebox/Sidebox.js';

class Dashboard {
	static ideas = {
		active: [],
		inactive: [],
		finished: [],
		all: [],
	};
	static viewers = [
		{
			name: 'Rock',
			about: 'Sleepy',
			profile_url: 'https://picsum.photos/200',
		},
		{
			name: 'Mohan',
			about: 'Innovation is going on...',
			profile_url: 'https://picsum.photos/200',
		},
		{
			name: 'Sheela',
			about: 'No where to go',
			profile_url: 'https://picsum.photos/200',
		},
		{
			name: 'Shivn',
			about: 'All good.',
			profile_url: 'https://picsum.photos/200',
		},
	];
	static suggestions = [
		{
			name: 'Rock',
			about: 'Sleepy',
			profile_url: 'https://picsum.photos/200',
		},
		{
			name: 'Mohan',
			about: 'Innovation is going on...',
			profile_url: 'https://picsum.photos/200',
		},
		{
			name: 'Sheela',
			about: 'No where to go',
			profile_url: 'https://picsum.photos/200',
		},
		{
			name: 'Shivn',
			about: 'All good.',
			profile_url: 'https://picsum.photos/200',
		},
	];
	static async get_ideas(show_snackbar = true) {
		try {
			const data = await request({ url: '/user/ideas' });
			console.log('Ideas fetched sucessfully!');
			if (show_snackbar) {
				Snackbar.show('Ideas fetched sucessfully!', 2000, 'sucess');
			}
			this.set_ideas(data.ideas);
		} catch (err) {
			console.log('ERROR AT GETTING PROJECTS! ', err);
			if (show_snackbar) {
				Snackbar.show('Failed to fectch! ', 2000, 'error');
			}

			throw err;
		}
	}
	static set_ideas(data) {
		this.ideas.active = data.filter((idea) => {
			return idea.status === 'active';
		});
		this.ideas.inactive = data.filter((idea) => idea.status === 'inactive');
		this.ideas.finished = data.filter((idea) => idea.status === 'finished');
		this.ideas.all = [...data];
		console.log(this.ideas);
	}
	static async reload(show_snackbar = false) {
		if (show_snackbar) {
			Snackbar.show('Refreshing...');
		}
		try {
			await this.get_ideas(false);
			setTimeout(() => {
				if (show_snackbar) {
					Snackbar.show('Refresh sucessful!', 'sucess', 2000);
				}
			}, 2000);
		} catch (error) {
			console.log(error);
			if (show_snackbar) {
				Snackbar.show(
					"Something went wrong! Couldn't refresh.",
					2000,
					'error'
				);
			}
		}
	}
	static get_more_viewers() {}
	static init() {
		const viewers_btn_handler = () => {
			const data = [
				{
					name: 'Rock',
					about: 'Sleepy',
					profile_url: 'https://picsum.photos/200',
				},
				{
					name: 'Mohan',
					about: 'Innovation is going on...',
					profile_url: 'https://picsum.photos/200',
				},
				{
					name: 'Sheela',
					about: 'No where to go',
					profile_url: 'https://picsum.photos/200',
				},
			];

			for (let i of data) {
				this.viewers.push(i);
			}
			this.update();
		};
		const getRandom4 = (num = 4) => {
			const random_indices = [];
			for (let i = 0; i < num; i++) {
				random_indices.push(Math.floor(Math.random() * 10));
			}
			return random_indices;
		};
		const get4Insights = (indices, ideas) => {
			const insights = [];
			for (let i = 0; i < indices.length; i++) {
				insights.push(ideas[i]);
			}
			return insights;
		};

		Sidebar.init();
		Tab.init();

		const viewers = new Sidebox(
			'Viewers',
			document.querySelector('.main-right'),
			'viewers',
			this.viewers,
			'View more',
			this.viewers_btn_handler
		);
		const suggestions = new Sidebar(
			'Suggestions',
			document.querySelector('.main-right'),
			'suggestions',
			this.suggestions,
			'View more'
		);

		this.get_ideas(true)
			.then(() => {
				Ideas.init(this.ideas, this.reload.bind(this));
				new Insights(get4Insights(getRandom4(), this.ideas.all));
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

window.onload = (event) => {
	Dashboard.init();
};
