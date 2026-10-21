function countOccurrences(obj: any, str: string): number {
    let count = 0;

    for (let key in obj) {
        if (key === str) {
            count++;
        }

        if (typeof obj[key] === "object" && obj[key] !== null) {
            count = count + countOccurrences(obj[key], str);
        }
    }

    return count;
}

console.log(
    countOccurrences(
        { model: "Bugatti", steer: { model: "HANKOOK", size: 30 } },
        "model"
    )
); // 2