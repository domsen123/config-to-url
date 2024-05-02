import { describe, expect, it } from 'vitest'
import type { Config } from './types'
import { generateUrls } from './index'

describe('generateUrls', () => {
  it('should generate all combinations of URLs based on provided config', () => {
    const config: Config[] = [
      {
        data: ['1', '2'],
        currentIndex: 0,
        assignTo: [
          {
            assignToType: 'query',
            assignToKey: 'queryA',
          },
        ],

      },
      {
        data: ['alpha', 'beta'],
        currentIndex: 0,
        assignTo: [
          {
            assignToType: 'param',
            assignToKey: 'paramA',
          },
        ],

      },
    ]

    const baseUrl = 'https://example.com'
    const path = '/path/:paramA'

    const expectedUrls = [
      'https://example.com/path/alpha?queryA=1',
      'https://example.com/path/beta?queryA=1',
      'https://example.com/path/alpha?queryA=2',
      'https://example.com/path/beta?queryA=2',
    ]

    const generatedUrls = generateUrls(config, baseUrl, path).map(u => u.toString())

    expect(generatedUrls).toEqual(expect.arrayContaining(expectedUrls))
    expect(generatedUrls.length).toBe(expectedUrls.length)

    // console.log(generatedUrls)
  })

  it('should generate all combinations of URLS based on provided config with locks', () => {
    const config: Config[] = [
      {
        data: ['1', '2'],
        currentIndex: 0,
        assignTo: [
          {
            assignToType: 'query',
            assignToKey: 'queryA',
          },
          {
            assignToType: 'query',
            assignToKey: 'queryB',
          },
        ],
        lock: true,
      },
      {
        data: ['alpha', 'beta'],
        currentIndex: 0,
        assignTo: [
          {
            assignToType: 'param',
            assignToKey: 'paramA',
          },
        ],

      },
    ]

    const baseUrl = 'https://example.com'
    const path = '/path/:paramA'

    const expectedUrls = [
      'https://example.com/path/alpha?queryA=1&queryB=1',
      'https://example.com/path/beta?queryA=1&queryB=1',
      'https://example.com/path/alpha?queryA=2&queryB=2',
      'https://example.com/path/beta?queryA=2&queryB=2',
    ]

    const generatedUrls = generateUrls(config, baseUrl, path).map(u => u.toString())

    expect(generatedUrls).toEqual(expect.arrayContaining(expectedUrls))
    expect(generatedUrls.length).toBe(expectedUrls.length)
  })

  it('handles empty config', () => {
    const config: Config[] = []
    const baseUrl = 'https://example.com'
    const path = '/test/path'
    const expectedUrls = ['https://example.com/test/path']

    const generatedUrls = generateUrls(config, baseUrl, path).map(url => url.toString())
    expect(generatedUrls).toEqual(expectedUrls)

    // console.log(generatedUrls)
  })

  it('handles single query', () => {
    const config: Config[] = [
      {
        data: ['1', '2'],
        currentIndex: 0,
        assignTo: [
          {
            assignToType: 'query',
            assignToKey: 'queryA',
          },
        ],
      },
    ]
    const baseUrl = 'https://example.com'
    const path = '/test/path'

    // Generate expected URLs
    const expectedUrls = [
      'https://example.com/test/path?queryA=1',
      'https://example.com/test/path?queryA=2',
    ]

    // Run the function with the test config
    const generatedUrls = generateUrls(config, baseUrl, path).map(url => url.toString())

    // Assert the results
    expect(generatedUrls).toEqual(expect.arrayContaining(expectedUrls))
    expect(generatedUrls.length).toBe(expectedUrls.length)
    // console.log(generatedUrls)
  })

  // it('handles large config', () => {
  //   // Create a large config with many parameters and queries
  //   const config: Config[] = [
  //     // Multiple params
  //     { data: ['param1Value1', 'param1Value2', 'param1Value3'], currentIndex: 0, assignTo:[ { assignToType: 'param', assignToKey: 'param1' }] },
  //     { data: ['param2Value1', 'param2Value2', 'param2Value3'], currentIndex: 0, assignTo: [{assignToType: 'param', assignToKey: 'param2'}] },
  //     // ... add more params as needed
  //     // Multiple queries
  //     { data: ['query1Value1', 'query1Value2'], currentIndex: 0,assignTo: [ {assignToType: 'query', assignToKey: 'query1'} ]},
  //     { data: ['query2Value1', 'query2Value2'], currentIndex: 0, assignTo: [{assignToType: 'query', assignToKey: 'query2'}] },
  //     // ... add more queries as needed
  //   ]

  //   const baseUrl = 'https://example.com'
  //   const path = '/path/:param1/:param2'

  //   // Generate expected URLs
  //   // Note: This can be complex with a large number of combinations. You may choose to check a subset or certain properties instead.
  //   // const expectedNumberOfUrls = config.filter(c => c.assignToType === 'param').reduce((acc, curr) => acc * curr.data.length, 1)
  //   //   * config.filter(c => c.assignToType === 'query').reduce((acc, curr) => acc * curr.data.length, 1)
  //   cpmst expectedNumberOfUrls = config

  //   // Run the function with the large config
  //   const generatedUrls = generateUrls(config, baseUrl, path)

  //   // Assert the results
  //   expect(generatedUrls.length).toBe(expectedNumberOfUrls)
  //   // Additional checks can be added here, depending on what exactly you want to test.
  // })
})
