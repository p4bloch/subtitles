import providers from './providers'

var search = function(type, options) {
    switch (type) {
        case 'movie':
            return searchMovie(options)
        case 'episode':
            return searchEpisode(options)
        default:
            return searchMovie(options)
    }
}

const searchMovie = function(options) {
  return 'searching a Movie'
}

const searchEpisode = function(options) {
  var provider = providers.findByName('tusubtitulo')
  console.log(provider)
  return 'searching an Episode'
}

search('episode')
