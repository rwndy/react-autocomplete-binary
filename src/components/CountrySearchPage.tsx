import type { FC } from 'react';
import { useState, useMemo } from 'react';

import SuggestionList from './SuggestionList';
import PerformanceMetrics from './PerformanceMetrics';
import SelectedCountry from './SelectedCountry';

import { useCountry } from '../utils/hooks';
import { searchCountryBinary } from '../utils/helper/searchCountryBinary';
import type { Country } from '../types/country';
import { searchCountryLinear } from '../utils/helper/searchCountryLinear';

const CountrySearchPage: FC = () => {
    const { countries, isLoading, error } = useCountry();
    const [query, setQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(
        null
    );

    const binaryResults = useMemo(() => {
        if (query.length < 2) {
            return { countries: [], comparisons: 0, time: 0 };
        }

        const result = searchCountryBinary(countries, query);
        return {
            countries: result.results,
            comparisons: result.comparisons,
            time: result.time,
        };
    }, [query, countries]);

    const linearResults = useMemo(() => {
        if (query.length < 2) {
            return { countries: [], comparisons: 0, time: 0 };
        }

        const result = searchCountryLinear(countries, query);
        return {
            countries: result.results,
            comparisons: result.comparisons,
            time: result.time,
        };
    }, [query, countries]);

    const handleSelect = (country: Country) => {
        setSelectedCountry(country);
        setQuery(country.name.common);
    };
    if (isLoading) {
        return (
            <div className='loading'>
                <div className='loading-spinner'></div>
                <p>Loading countries...</p>
            </div>
        );
    }

    if (error) {
        return <div className='error'>Error: {error}</div>;
    }

    return (
        <div className='country-search-container'>
            <div className='header'>
                <h1>🔍 Autocomplete: Binary vs Linear Search</h1>
                <p>
                    Real-time comparison on {countries.length} countries
                    <br />
                    <small>Type at least 2 characters to search</small>
                </p>
            </div>

            <div className='comparison-container'>
                <div className='search-box'>
                    <h2>
                        <span className='badge binary'>Binary Search</span>
                    </h2>
                    <div className='input-wrapper'>
                        <input
                            type='text'
                            className='search-input'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='Type country name (e.g., C, Ma, Ind)'
                            autoFocus
                        />

                        {/* Suggestions Dropdown */}
                        <SuggestionList
                            countries={binaryResults.countries}
                            onSelect={handleSelect}
                        />
                    </div>

                    {query.length >= 2 && (
                        <PerformanceMetrics
                            comparisons={binaryResults.comparisons}
                            time={binaryResults.time}
                            resultsCount={binaryResults.countries.length}
                            type='binary'
                        />
                    )}
                </div>

                <div className='search-box'>
                    <h2>
                        <span className='badge linear'>Linear Search</span>
                    </h2>
                    <div className='input-wrapper'>
                        <input
                            type='text'
                            className='search-input'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='Type country name (e.g., C, Ma, Ind)'
                        />

                        <SuggestionList
                            countries={linearResults.countries}
                            onSelect={handleSelect}
                        />
                    </div>

                    {query.length >= 2 && (
                        <PerformanceMetrics
                            comparisons={linearResults.comparisons}
                            time={linearResults.time}
                            resultsCount={linearResults.countries.length}
                            type='linear'
                        />
                    )}
                </div>
            </div>

            {selectedCountry && (
                <div className='statistics-panel'>
                    <h2>🌍 Selected Country</h2>
                    <SelectedCountry country={selectedCountry} />
                </div>
            )}

            {query.length >= 2 && binaryResults.comparisons > 0 && (
                <div className='statistics-panel'>
                    <h2>📊 Performance Comparison</h2>

                    <div className='stats-grid'>
                        <div className='stat-card'>
                            <h3>Comparisons Saved</h3>
                            <div className='stat-value'>
                                {linearResults.comparisons -
                                    binaryResults.comparisons}
                                <span className='stat-unit'>comparisons</span>
                            </div>
                        </div>

                        <div className='stat-card'>
                            <h3>Time Saved</h3>
                            <div className='stat-value'>
                                {(
                                    linearResults.time - binaryResults.time
                                ).toFixed(2)}
                                <span className='stat-unit'>μs</span>
                            </div>
                        </div>

                        <div className='stat-card'>
                            <h3>Speed Improvement</h3>
                            <div className='stat-value'>
                                {binaryResults.comparisons > 0 &&
                                linearResults.comparisons > 0
                                    ? (
                                          linearResults.comparisons /
                                          binaryResults.comparisons
                                      ).toFixed(1)
                                    : '0'}
                                <span className='stat-unit'>× faster</span>
                            </div>
                            <small
                                style={{
                                    color: '#64748b',
                                    fontSize: '0.75rem',
                                    marginTop: '0.5rem',
                                    display: 'block',
                                }}
                            >
                                Based on comparisons ratio
                            </small>
                        </div>

                        <div className='stat-card'>
                            <h3>Efficiency Gain</h3>
                            <div className='stat-value'>
                                {linearResults.comparisons > 0
                                    ? (
                                          ((linearResults.comparisons -
                                              binaryResults.comparisons) /
                                              linearResults.comparisons) *
                                          100
                                      ).toFixed(1)
                                    : '0'}
                                <span className='stat-unit'>%</span>
                            </div>
                        </div>
                    </div>

                    <div className='comparison-chart'>
                        <h3 className='chart-title'>Visual Comparison</h3>

                        <div className='chart-bars'>
                            <div className='chart-bar-row'>
                                <div className='chart-label'>Binary Search</div>
                                <div className='chart-bar-container'>
                                    <div
                                        className='chart-bar binary'
                                        style={{
                                            width:
                                                linearResults.comparisons > 0
                                                    ? `${
                                                          (binaryResults.comparisons /
                                                              linearResults.comparisons) *
                                                          100
                                                      }%`
                                                    : '0%',
                                        }}
                                    >
                                        {binaryResults.comparisons}
                                    </div>
                                </div>
                            </div>

                            <div className='chart-bar-row'>
                                <div className='chart-label'>Linear Search</div>
                                <div className='chart-bar-container'>
                                    <div
                                        className='chart-bar linear'
                                        style={{ width: '100%' }}
                                    >
                                        {linearResults.comparisons}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CountrySearchPage;
