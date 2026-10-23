function findIntersection(arr1: number[], arr2: number[]): number[] {
    const result: number[] = [];

    for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i]) && !result.includes(arr1[i])) {
            result.push(arr1[i]);
        }
    }

    return result;
}

console.log(findIntersection([1, 2, 3], [3, 2, 0]));
// [2, 3]