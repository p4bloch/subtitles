var subtitles = require('../lib')

subtitles.search('episode', {
  provider: 'tusubtitulo',
  showName: 'the big bang theory',
  season: '9',
  episode: '01',
  language: 'es_la'
}).then(function(subtitles) {
  subtitles[0].download('tbbt.9x01.srt')
})
