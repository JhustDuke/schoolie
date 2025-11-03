interface DuplicateCheckResultInterface {
	isDuplicate: boolean;
	duplicates: string[];
}

export function checkDuplicates(
	inputA: string | string[],
	inputB: string | string[]
): DuplicateCheckResultInterface {
	let arrA: string[] = Array.isArray(inputA) ? inputA : [inputA];
	let arrB: string[] = Array.isArray(inputB) ? inputB : [inputB];

	arrA = arrA.map(function (item) {
		return item.toLowerCase();
	});
	arrB = arrB.map(function (item) {
		return item.toLowerCase();
	});

	const duplicates: string[] = arrB.filter(function (item) {
		return arrA.includes(item);
	});

	return {
		isDuplicate: duplicates.length > 0,
		duplicates,
	};
}