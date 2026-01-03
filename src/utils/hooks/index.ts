import { useState, useEffect, useMemo } from 'react';
import type { Country } from '../../types/country';

export const useCountry = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCountry = async () => {
        const url = `https://restcountries.com/v3.1/all`;
        const params = new URLSearchParams();
        params.append('fields', 'name');

        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`${url}?${params}`);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            setCountries(result);
        } catch (error) {
            console.error(error);
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to fetch countries'
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCountry();
    }, []);

    const sortedCountries = useMemo(() => {
        return [...countries].sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
        );
    }, [countries]);

    return {
        countries: sortedCountries,
        isLoading,
        error,
        refetch: fetchCountry,
    };
};
