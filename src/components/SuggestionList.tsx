import type { FC } from 'react';
import type { Country } from '../types/country';

interface SuggestionListProps {
    countries: Country[];
    onSelect: (country: Country) => void;
}

const SuggestionList: FC<SuggestionListProps> = ({ countries, onSelect }) => {
    if (countries.length === 0) return null;

    return (
        <ul className='suggestions-list'>
            {countries.map((country) => (
                <li
                    key={country.name.common}
                    className='suggestion-item'
                    onClick={() => onSelect(country)}
                >
                    <strong>{country.name.common}</strong>
                    <span className='official'>{country.name.official}</span>
                </li>
            ))}

            {countries.length > 0 && (
                <li className='suggestion-more'>
                    Showing all {countries.length} result
                    {countries.length !== 1 ? 's' : ''}
                </li>
            )}
        </ul>
    );
};

export default SuggestionList;
