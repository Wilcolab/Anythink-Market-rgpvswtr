/**
 * Convert a string to camelCase.
 * Handles spaces, underscores, hyphens and other non-alphanumeric separators.
 *
 * Examples:
 *  "first name"   -> "firstName"
 *  "user_id"      -> "userId"
 *  "SCREEN_NAME"  -> "screenName"
 *  "mobile-number"-> "mobileNumber"
 *
 * @param {string} input
 * @returns {string}
 */
function toCamelCase(input) {
    if (input == null) return '';
    const str = String(input).trim();
    if (str.length === 0) return '';

    // If there are no separators but mixed case (PascalCase or camelCase),
    // convert leading char to lower-case and keep the rest (preserve internal caps).
    if (!/[^A-Za-z0-9]/.test(str) && /[A-Z]/.test(str) && /[a-z]/.test(str)) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }

    // Split on any sequence of non-alphanumeric characters, filter out empties.
    const parts = str.split(/[^A-Za-z0-9]+/).filter(Boolean);
    if (parts.length === 0) return '';

    const first = parts[0].toLowerCase();
    const rest = parts.slice(1).map(part => {
        const lower = part.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }).join('');

    return first + rest;
}

module.exports = { toCamelCase };