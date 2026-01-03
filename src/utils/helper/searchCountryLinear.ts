import type { Country } from '../../types/country';

export const searchCountryLinear = (
    countries: Country[],
    prefix: string
): { results: Country[]; comparisons: number; time: number } => {
    const start = performance.now();
    let comparisons = 0;

    if (!prefix || prefix.length < 2) {
        return { results: [], comparisons: 0, time: 0 };
    }

    const normalizedPrefix = prefix.toLowerCase().trim();
    const results: Country[] = [];

    for (let i = 0; i < countries.length; i++) {
        comparisons++;
        const countryName = countries[i].name.common.toLowerCase();

        if (countryName.startsWith(normalizedPrefix)) {
            results.push(countries[i]);
        }
    }

    const time = (performance.now() - start) * 1000;
    return { results, comparisons, time };
};
