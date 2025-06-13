import { domRefs } from "../view/refs";
export const insertBeforeAddSession = function (parent: any, newElem: any) {
	const { addSessionOption } = domRefs;
	if (!parent) {
		console.error("parent elem does not exist");
		return;
	}
	if (!newElem) {
		console.error("newElem does not exist");
		return;
	}
	if (!addSessionOption) {
		console.error("element with id addSession is null");
	}
	parent.insertBefore(newElem, addSessionOption);
};
