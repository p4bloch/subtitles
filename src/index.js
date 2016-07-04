import * as providers from './providers'

export function search(type, options, cb) {
  switch (type) {
    case 'movie':
      return searchMovie(options, cb)
    case 'episode':
      return searchEpisode(options, cb)
  }
}

const searchMovie = function(options, cb) {
  return 'searching a Movie'
}

const searchEpisode = function(options, cb) {
  const { provider } = options
  var Provider = providers.findByName(provider)
  Provider.find(options, cb)
}
