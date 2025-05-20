export const tabsRefs = {
	tabsContentsWrapper: document.querySelector<HTMLElement>(
		"#tabsContentsWrapper"
	),

	tabsMenu: document.querySelector<HTMLElement>("#tabsMenu"),

	//tab buttons

	overViewTabBtn: document.querySelector<HTMLElement>("#overViewTabBtn"),

	gradeOneTabBtn: document.querySelector<HTMLElement>("#gradeOneTabBtn"),

	gradeTwoTabBtn: document.querySelector<HTMLElement>("#gradeTwoTabBtn"),

	gradeThreeTabBtn: document.querySelector<HTMLElement>("#gradeThreeTabBtn"),

	moreTabBtn: document.querySelector<HTMLElement>("#moreTabBtn"),

	//contents hidden by default
	overViewTabContents: document.querySelector<HTMLDivElement>(
		"#overViewTabContents"
	),

	gradeOneTabContents: document.querySelector<HTMLDivElement>(
		"#gradeOneTabContents"
	),

	gradeTwoTabContents: document.querySelector<HTMLDivElement>(
		"#gradeTwoTabContents"
	),

	gradeThreeTabContents: document.querySelector<HTMLDivElement>(
		"#gradeThreeTabContents"
	),

	moreTabContents: document.querySelector<HTMLDivElement>("#moreTabContents"),
};
