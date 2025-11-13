// basicprompt.js
// Prompt to convert normal test case titles into camelCase identifiers

const prompt = `Convert plain test case titles into lowerCamelCase identifiers suitable for function or test names.

Rules:
- Remove punctuation (.,:;!?'"()[]{}).
- Split on spaces, hyphens (-), and underscores (_).
- Lowercase the first word entirely.
- Capitalize the first letter of each subsequent word and lowercase the rest.
- Preserve numbers as-is (they count as words).
- Remove any extra whitespace.
- Return only the resulting identifier with no extra explanation or formatting.

Examples:
Input: "User logs in with valid credentials"
Output: "userLogsInWithValidCredentials"

Input: "create-account with email_and password"
Output: "createAccountWithEmailAndPassword"

Input: "should return 404 for missing resource"
Output: "shouldReturn404ForMissingResource"
`;

module.exports = prompt;