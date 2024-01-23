# GenerateURL Module

## Overview

The `GenerateURL` module provides a versatile TypeScript utility to dynamically generate URLs based on a given configuration. It is designed to handle a variety of scenarios, including different combinations of URL parameters and query strings.

## Features

- **Dynamic URL Generation**: Create URLs dynamically by combining multiple path parameters and query strings.
- **Flexible Configurations**: Easily adjust the URL generation by modifying the configuration objects.
- **Support for Large Configurations**: Efficiently handles large and complex configurations.

## Installation

To use the `GenerateURL` module in your project, simply copy and include the `generateUrl.ts` file in your TypeScript project.

## Usage

### Basic Example

Here's a simple example of how to use the `GenerateURL` module:

```typescript
import { generateUrls } from './generateUrl';

const config = [
  // Your configuration array
];

const baseUrl = 'https://example.com';
const path = '/your/path/:param';

const urls = generateUrls(config, baseUrl, path);
console.log(urls);
```

### Configuration Format

The configuration should be an array of objects, each specifying either a URL parameter or a query string. Each object in the configuration array should follow this structure:

```typescript
{
  data: string[],         // Array of values for the parameter or query string
  currentIndex: number,   // Index to specify which value to use
  assignTo: 'param' | 'query', // Specify whether it's a URL parameter or a query string
  assignToKey: string     // The key for the parameter or query string
}
```

## Tests

The module comes with a suite of tests to ensure functionality. We use Vitest for testing. Run the tests using the following command:

```bash
npx vitest
```

## Contributing

Contributions to the `GenerateURL` module are welcome. Please ensure to follow the existing coding style and add tests for any new features or bug fixes.
