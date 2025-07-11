interface searchModel {
	sessionyear: string | null;
	className: string | null;
	gender: string | null;
	[key: string]: string | null;
}

export const navBarModel = (function () {
	const searchModel = function (searchKeysObj: searchModel): string {
		const HighPriorityKeys = ["sessionyear", "className", "gender"];
		const queryParts: string[] = [];

		//search for high priority
		HighPriorityKeys.forEach(function (key) {
			if (searchKeysObj[key]) {
				queryParts.push(`${key}=${encodeURIComponent(searchKeysObj[key])}`);
			}
		});

		//  (low-priority)
		for (const key in searchKeysObj) {
			if (
				HighPriorityKeys.includes(key) === false &&
				searchKeysObj[key] !== null
			) {
				queryParts.push(`${key}=${encodeURIComponent(searchKeysObj[key])}`);
			}
		}

		let searchUrl = "";
		if (queryParts.length > 0) {
			searchUrl = "?".concat(queryParts.join("&"));
		}

		return searchUrl;
	};

	return {
		searchModel,
	};
})();
