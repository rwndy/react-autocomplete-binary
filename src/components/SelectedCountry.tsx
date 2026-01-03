import type { FC } from 'react';
import type { Country } from '../types/country';

const SelectedCountry: FC<{ country: Country | null }> = ({ country }) => {
    if (!country) return null;

    return (
        <div className='selected-country'>
            <h3 className='result-title'>{country.name.common}</h3>
            <p className='result-official'>Official: {country.name.official}</p>

            {country.name.nativeName && (
                <div className='native-names'>
                    <h4>Native Names:</h4>
                    {Object.entries(country.name.nativeName).map(
                        ([lang, names]) => (
                            <div key={lang} className='native-name-item'>
                                <span className='lang-code'>
                                    {lang.toUpperCase()}:
                                </span>
                                <span className='native-common'>
                                    {names.common}
                                </span>
                                <span className='native-official'>
                                    ({names.official})
                                </span>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default SelectedCountry;
