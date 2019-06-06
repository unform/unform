const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')

const Container = CompLibrary.Container

const Community = (props) => {
  const { config: { baseUrl } } = props;
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer">
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <img style={{ marginBottom: 26 }} src={`${baseUrl}img/community.svg`} />
          <p>Do you have any questions or are you facing a mistake?</p>
          <p>Join the Rocketseat community on Discord</p>

          <a href="https://rocketseat.com.br/comunidade" className="btn primary">
            <i className="fab fa-discord" />
            Access community
          </a>
        </div>
      </Container>
    </div>
  )
}

module.exports = Community
