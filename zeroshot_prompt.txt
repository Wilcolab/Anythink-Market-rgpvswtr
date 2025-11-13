function toSnakeCase(text) {
    return text
        .toLowerCase()
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .replace(/[^\w_]/g, ''); // Remove non-word characters except underscores
}

// Example usage
const exampleText = "Hello World! This is a Test.";
const snakeCased = toSnakeCase(exampleText);
console.log(snakeCased); // Output: hello_world_this_is_a_test