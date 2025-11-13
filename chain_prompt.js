// toKebabCase.js
// Minimal, correct implementation (Step 1)

export function toKebabCase(input) {
    // Coerce null/undefined to empty string
    if (input == null) return '';

    // Arrays -> join with single space
    if (Array.isArray(input)) {
        input = input.join(' ');
    } else if (typeof input === 'object') {
        // Plain object -> return empty string
        const tag = Object.prototype.toString.call(input);
        if (tag === '[object Object]') return '';
        // Other objects -> String(obj)
        input = String(input);
    } else {
        input = String(input);
    }

    // Unicode-normalize (NFC) to keep combining sequences sensible
    // and work well with toLocaleLowerCase below.
    try {
        input = input.normalize();
    } catch (e) {
        // ignore if normalize not supported for some reason
    }

    // Replace common separators (whitespace, underscores, dots, and many punctuation)
    // with a single hyphen. We deliberately avoid matching emoji and letters/digits.
    const SEPARATORS = /[ \t\n\r\f\v\._\/\\,;:!?\|\+\=\(\)\[\]\{\}<>@#$%^&*~`'"]+/g;
    let s = input.replace(SEPARATORS, '-');

    // Collapse multiple hyphens and trim leading/trailing hyphens
    s = s.replace(/-+/g, '-').replace(/(^-+|-+$)/g, '');

    // Lowercase using locale-aware API (default locale)
    s = s.toLocaleLowerCase();

    return s;
}

export default toKebabCase;

/*
Examples:
"Foo Bar"         -> "foo-bar"
"user_id"         -> "user-id"
["a","b c"]       -> "a-b-c"
"foo.bar.baz"     -> "foo-bar-baz"
"  Leading  Trailing " -> "leading-trailing"
"Café"            -> "café"
"100% ready!"     -> "100-ready"
"emoji 😊 test"   -> "emoji-😊-test"
*/