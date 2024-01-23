# Config-to-URL Module

## Overview

The `Config-to-URL` module is a versatile TypeScript utility for dynamically generating URLs based on configurations. It simplifies the process of creating complex URLs from a variety of parameters and query strings.

## Features

- **Dynamic URL Generation**: Easily create URLs by combining multiple path parameters and query strings.
- **Flexible Configurations**: Adapt URL generation by modifying configuration objects.
- **NPM Package**: Conveniently available as an npm package for quick integration.

## Installation

Install the `Config-to-URL` module via npm:

```bash
pnpm install config-to-url
```

## Usage

Import and use the `Config-to-URL` module in your project:

```typescript
import { generateUrls } from 'config-to-url';

const config = [
  // Your configuration array
];

const baseUrl = 'https://example.com';
const path = '/your/path/:param';

const urls = generateUrls(config, baseUrl, path);
```

### Configuration Format

Each object in the configuration array should follow this structure:

```typescript
{
  data: string[],         // Array of values for the parameter or query string
  currentIndex: number,   // Index to specify which value to use
  assignTo: 'param' | 'query', // Specify whether it's a URL parameter or a query string
  assignToKey: string     // The key for the parameter or query string
}
```

## Tests

The module includes a suite of tests to ensure functionality. Run the tests in your project environment.

## Contributing

Contributions to `Config-to-URL` are welcome. Please follow the existing coding style and add tests for any new features or bug fixes.

## Sample
```typescript
import { generateUrls } from 'config-to-url';

const config: Config[] = [
  {
    data: ['1', '2'],
    currentIndex: 0,
    assignTo: 'query',
    assignToKey: 'queryA',
  },
  {
    data: ['alpha', 'beta'],
    currentIndex: 0,
    assignTo: 'param',
    assignToKey: 'paramA',
  },
]

const baseUrl = 'https://example.com'
const path = '/path/:paramA'

const urls = generateUrls(config, baseUrl, path).map(url => url.toString())
// console.log(urls)
// [
//  'https://example.com/path/alpha?queryA=1',
//  'https://example.com/path/beta?queryA=1',
//  'https://example.com/path/alpha?queryA=2',
//  'https://example.com/path/beta?queryA=2'
// ]
```
