import React from 'react'
import request from 'superagent'

class ExternalSvg extends React.Component {
  constructor(props) {
    super(props)

    this.getSvg = this.getSvg.bind(this)
    this.handleSvg = this.handleSvg.bind(this)

    this.getSvg()

    this.state = {
      svg: ''
    }
  }

  getSvg() {
    request.get(this.props.src, this.handleSvg)
  }

  handleSvg(error, response) {
    if (error) {
      throw error
    }

    this.setState({
      svg: response.body.toString()
    })
  }

  render() {
    return (
      <svg
        ref='svg'
        dangerouslySetInnerHTML={{__html: this.state.svg}}
      />
    )
  }
}

ExternalSvg.propTypes = {
  src: React.PropTypes.string.isRequired
}

export default ExternalSvg
