export default class Insight {
	constructor(insight, parent, num) {
		this.insight = insight;
		this.parent = parent;
		this.num = num;
		this.create_insight();
	}

	format_date(date) {
		return new Date(date).toLocaleDateString('en-IN');
	}

	create_insight() {
		const div = document.createElement('div');
		div.className = 'insight';
		div.id = 'insight' + this.insight._id;
		div.innerHTML = `<div class='insight-header'>
                                <span class='material-icons-sharp insight-icon insight-c${
									this.num
								}'>
                                    analytics
                                </span>
                            </div>
                            <div class='insight-body'>
                                <div class='insight-body--left'>
                                    <h1 class='insight-title'>${
										this.insight.title
									}</h1>
                                    <h3 class='insight-desc'>${
										this.insight.description
									}</h3>
                                </div>
                                <div class='insight-body--right'>
                                    <div class='progression'>
                                        <svg class='progression-svg'>
                                            <circle cx='38' cy='38' r='36'
                                                class='progression-svg--circle svg--circle-${
													this.num
												}'></circle>
                                        </svg>
                                        <div class='progression-num'>
                                            <p>${this.num * 10}%</p>
                                        </div>
                                    </div>
                                </div>
							</div>
                            <div class='insight-footer'>
                                <p class='insite-date'>${this.format_date(
									this.insight.updatedAt
								)}</p>
                            </div>`;
		this.parent.appendChild(div);
	}
}
