/**
 * Converts arbitrary input into camelCase.
 * @param {unknown} input - The input to convert.
 * @param {CamelCaseOptions} [options] - Options for conversion.
 * @returns {string} The camelCased string.
 */
export default function camelCase(input, options = {}) {
    const {
        preserveAcronyms = false,
        locale = 'en',
        stripNonWord = true,
        preserveUnicodeCombining = true,
        transliterate = 'none',
        allowLeadingDigit = false,
        separator = /[\s\W]+/,
        maxLength = null,
        throwOnInvalid = false,
    } = options;

    // Handle invalid input types
    if (input === null || input === undefined) return '';
    if (typeof input === 'boolean' || typeof input === 'number' || typeof input === 'bigint') {
        return String(input);
    }
    if (Array.isArray(input)) {
        input = input.join(' ');
    } else if (typeof input === 'object') {
        if (input.toString && input.toString() !== '[object Object]') {
            input = input.toString();
        } else if (throwOnInvalid) {
            throw new TypeError('Invalid input type');
        } else {
            return '';
        }
    }

    // Normalize and split input
    input = String(input).normalize('NFKC').trim();
    const tokens = input.split(separator).filter(Boolean);

    // Process tokens
    const result = tokens.map((token, index) => {
        if (stripNonWord) {
            token = token.replace(/[^\w\s]/g, '');
        }
        if (transliterate === 'basic') {
            token = token.replace(/à|á|â|ã|ä|å/g, 'a')
                         .replace(/ç/g, 'c')
                         .replace(/ñ/g, 'n')
                         .replace(/ø/g, 'o')
                         .replace(/é|è|ê|ë/g, 'e');
        }
        if (index === 0) {
            return token.toLocaleLowerCase(locale);
        }
        return token.charAt(0).toLocaleUpperCase(locale) + token.slice(1).toLocaleLowerCase(locale);
    }).join('');

    // Handle leading digits
    if (!allowLeadingDigit && /^\d/.test(result)) {
        return '_' + result;
    }

    // Truncate if maxLength is set
    if (maxLength !== null && result.length > maxLength) {
        return result.slice(0, maxLength);
    }

    return result;
}

/**
 * @typedef {Object} CamelCaseOptions
 * @property {boolean} [preserveAcronyms=false] - Preserve uppercased acronyms.
 * @property {string|string[]} [locale='en'] - Locale for case mapping.
 * @property {boolean} [stripNonWord=true] - Remove non-word characters.
 * @property {boolean} [preserveUnicodeCombining=true] - Preserve combining diacritics.
 * @property {'none'|'basic'|'aggressive'} [transliterate='none'] - Transliteration option.
 * @property {boolean} [allowLeadingDigit=false] - Allow leading digits.
 * @property {string|RegExp} [separator=/[\s\W]+/] - Custom separator.
 * @property {number|null} [maxLength=null] - Max length of result.
 * @property {boolean} [throwOnInvalid=false] - Throw on invalid input types.
 */

/**
 * Converts a string into dot.case format.
 * @param {string} input - The input string to convert.
 * @param {Object} [options] - Options for conversion.
 * @returns {string} The dot.cased string.
 */
export function toDotCase(input, options = {}) {
    if (input === null || input === undefined) return '';
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }

    const { stripNonWord = true } = options;

    // Normalize and split input
    input = String(input).normalize('NFKC').trim();
    const tokens = input.split(/[\s\W]+/).filter(Boolean);

    // Process tokens
    const result = tokens.map(token => {
        if (stripNonWord) {
            token = token.replace(/[^\w]/g, '');
        }
        return token.toLowerCase();
    }).join('.');

    return result;
}
