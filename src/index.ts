// index.ts
import type { Config } from './types'

// Generate all possible URL combinations based on configuration
export function generateUrls(config: Config[], baseUrl: string, path: string): URL[] {
  const paramConfigs = config.filter(c => c.assignTo.some(a => a.assignToType === 'param'))
  const queryConfigs = config.filter(c => c.assignTo.some(a => a.assignToType === 'query'))
  const paramCombinations = generateCombinations(paramConfigs)
  const queryCombinations = generateCombinations(queryConfigs)

  return paramCombinations.flatMap(params =>
    queryCombinations.map(query => buildUrl(baseUrl, path, params, query)),
  )
}

// Build a complete URL from base URL, path, parameters, and queries
function buildUrl(baseUrl: string, path: string, params: Config[], queries: Config[]): URL {
  const url = new URL(replaceParamsInPath(path, params), baseUrl)
  queries.forEach((query) => {
    query.assignTo.forEach((assign) => {
      if (assign.assignToType === 'query')
        url.searchParams.set(assign.assignToKey, query.data[query.currentIndex])
    })
  })
  return url
}

// Replace parameter placeholders in path with actual parameter values
function replaceParamsInPath(path: string, params: Config[]): string {
  params.forEach((param) => {
    param.assignTo.forEach((assign) => {
      if (assign.assignToType === 'param')
        path = path.replace(`:${assign.assignToKey}`, param.data[param.currentIndex])
    })
  })
  return path
}

// Generate all combinations of configurations
function generateCombinations(configs: Config[]): Array<Array<Config>> {
  if (configs.length === 0)
    return [[]]

  const firstConfig = configs[0]
  let combinations = []

  // Behandle die Konfiguration, die gesperrt ist
  if (firstConfig.lock) {
    // Durchlaufe alle Werte in `data`, aber verwende den gleichen Index für alle `assignTo` Elemente
    combinations = firstConfig.data.flatMap((dataValue, i) =>
      generateCombinations(configs.slice(1)).map(combination =>
        [Object.assign({}, firstConfig, { currentIndex: i }), ...combination],
      ),
    )
  }
  else {
    // Wenn `lock` nicht gesetzt ist, generiere Kombinationen, indem du `currentIndex` variierst
    combinations = firstConfig.data.flatMap((_, i) =>
      generateCombinations(configs.slice(1)).map(combination =>
        [Object.assign({}, firstConfig, { currentIndex: i }), ...combination],
      ),
    )
  }

  return combinations
}
