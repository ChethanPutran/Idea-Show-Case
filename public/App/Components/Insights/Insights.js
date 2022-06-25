import Insight from './Insight.js';

export default class Insights {
	static num = 0;
	static INSIGHT_PARENT_ID = 'insights';
	constructor(insights) {
		this.insights = insights;
		this.parent = document.getElementById(Insights.INSIGHT_PARENT_ID);
		console.log(this.parent);
		this.create_insights();
	}

	create_insights() {
		this.insights.forEach((insight) => {
			Insights.num++;
			new Insight(insight, this.parent, Insights.num);
		});
	}
}
