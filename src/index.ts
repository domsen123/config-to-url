import type { Config } from './types'

// Generate all possible URL combinations based on configuration
export function generateUrls(config: Config[], baseUrl: string, path: string): URL[] {
  const paramConfigs = config.filter(c => c.assignTo === 'param')
  const queryConfigs = config.filter(c => c.assignTo === 'query')
  const paramCombinations = generateCombinations(paramConfigs)
  const queryCombinations = generateCombinations(queryConfigs)

  return paramCombinations.flatMap(params =>
    queryCombinations.map(query => buildUrl(baseUrl, path, params, query)),
  )
}

// Build a complete URL from base URL, path, parameters, and queries
function buildUrl(baseUrl: string, path: string, params: Config[], queries: Config[]): URL {
  const url = new URL(replaceParamsInPath(path, params), baseUrl)
  queries.forEach(query => url.searchParams.set(query.assignToKey, query.data[query.currentIndex]))
  return url
}

// Replace parameter placeholders in path with actual parameter values
function replaceParamsInPath(path: string, params: Config[]): string {
  return params.reduce((updatedPath, param) =>
    updatedPath.replace(`:${param.assignToKey}`, param.data[param.currentIndex]), path)
}

// Generate all combinations of configurations
function generateCombinations(configs: Config[]): Array<Array<Config>> {
  if (configs.length === 0)
    return [[]]
  return configs[0].data.flatMap((_, i) =>
    generateCombinations(configs.slice(1)).map(combination =>
      [Object.assign({}, configs[0], { currentIndex: i }), ...combination],
    ),
  )
}
