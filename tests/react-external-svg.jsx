import React from 'react'
import TestUtils from 'react-addons-test-utils'
import request from 'superagent'

import ExternalSvg from '../react-external-svg.jsx'

const TEST_SRC = process.env.TEST_SRC
  || 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg'

describe('react-external-svg', function describeSuite() {
  it('should render an external SVG', function testRender(done) {
    const externalSvg = TestUtils.renderIntoDocument(
      <ExternalSvg src={TEST_SRC}/>
    )

    expect(externalSvg).toBeDefined()
    expect(externalSvg.props.src).toBe(TEST_SRC)

    const svg = externalSvg.refs.svg

    expect(svg).toBeDefined()
    expect(svg.innerHTML).toBe('')
    
    function handleTestSvg(error, response) {
      if (error) {
        throw error
      }

      if (externalSvg.state.svg === '') {
        return setTimeout(handleTestSvg.bind(this, error, response), 100)
      }

      expect(externalSvg.state.svg).toBe(response.body.toString())
      expect(svg.innerHTML).not.toBe('')

      done()
    }

    request.get(TEST_SRC, handleTestSvg)
  })
})
