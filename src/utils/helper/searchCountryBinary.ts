import type { Country } from '../../types/country';

export const searchCountryBinary = (
    countries: Country[],
    prefix: string
): { results: Country[]; comparisons: number; time: number } => {
    if (!prefix || prefix.length < 2) {
        return { results: [], comparisons: 0, time: 0 };
    }

    const normalizedPrefix = prefix.toLowerCase().trim();

    const iterations = 100;
    let totalComparisons = 0;
    let results: Country[] = [];

    const start = performance.now();

    for (let iter = 0; iter < iterations; iter++) {
        let comparisons = 0;

        let left = 0;
        let right = countries.length - 1;
        let firstIndex = -1;

        while (left <= right) {
            comparisons++;
            const mid = Math.floor((left + right) / 2);
            const countryName = countries[mid].name.common.toLowerCase();

            if (countryName.startsWith(normalizedPrefix)) {
                firstIndex = mid;
                right = mid - 1;
            } else if (countryName < normalizedPrefix) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        if (firstIndex !== -1) {
            const tempResults: Country[] = [];
            for (let i = firstIndex; i < countries.length; i++) {
                comparisons++;
                const name = countries[i].name.common.toLowerCase();
                if (name.startsWith(normalizedPrefix)) {
                    if (iter === 0) tempResults.push(countries[i]);
                } else {
                    break;
                }
            }
            if (iter === 0) results = tempResults;
        }

        totalComparisons = comparisons;
    }

    const totalTime = performance.now() - start;
    const averageTime = totalTime / iterations;

    return {
        results,
        comparisons: totalComparisons,
        time: averageTime * 1000,
    };
};
