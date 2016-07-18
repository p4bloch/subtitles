import * as providers from './providers'

export function search(type, options) {
  switch (type) {
    case 'movie':
      return searchMovie(options)
    case 'episode':
      return searchEpisode(options)
  }
}

const searchMovie = function(options) {
  return 'searching a Movie'
}

const searchEpisode = function(options) {
  const { provider } = options
  var Provider = providers.findByName(provider)
  return Provider.find(options)
}
