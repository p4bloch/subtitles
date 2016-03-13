import * as providers from './providers'

var search = function(type, options, cb) {
  switch (type) {
    case 'movie':
      return searchMovie(options, cb)
    case 'episode':
      return searchEpisode(options, cb)
    default:
      return searchMovie(options, cb)
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

// search('episode', {
//   provider: 'tusubtitulo',
//   tvShow: 'new girl',
//   season: 5,
//   episode: 6,
//   language: 'es_es'
// }, function(subtitles) {
//   subtitles[0].download('newgirl.srt')
// })
