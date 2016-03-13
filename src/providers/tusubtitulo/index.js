import _ from 'lodash'
import { getEpisodeUrl, getIndex, updateIndex, findTvShowByName} from './helpers'
import Subtitle from './Subtitle'
import Xray from 'x-ray'
var x = Xray()

export default {
  name: 'tusubtitulo',
  types: ['episode'],
  languages: ['es_es', 'es_la'],

  find: function(options, cb) {
    const { tvShow, season, episode, language } = options
    // This should be executed on first run and once every X days
    // updateIndex()
    let TvShow = findTvShowByName(tvShow)
    if (!TvShow) {
      console.error("Could not find tvShows by name " + tvShow)
      process.exit()
    }
    findSubtitlesForEpisode(TvShow, season, episode, (subtitles) => {
      cb(findSubtitlesForLanguage(language, subtitles))
    })
  }
}

let findSubtitlesForEpisode = (TvShow, season, episode, cb) => {
  const url = getEpisodeUrl(TvShow, season, episode)
  x(url, '#version', [{
    title: '.title-sub',
    comment: 'span.comentario',
    languages: x('.sslist', [{
      language: '.li-idioma',
      status: '.li-estado',
      downloadLink: '.descargar a@href'
    }])
  }])(function(err, subtitles) {
    subtitles.showInfo = {
      TvShow: TvShow,
      season: season,
      episode: episode
    }
    cb(subtitles)
  })
}

let findSubtitlesForLanguage = (language, subtitles) => {
  var str
  if (language == 'es_es') {
    str = "Español (España)"
  }
  if (language == 'es_la') {
    str = "Español (Latinoamérica)"
  }

  var subtitlesForLanguage = []
  subtitles.forEach((subtitle) => {
    let language = _.find(subtitle.languages, (l) => {
      return _.trim(l.language) == str
    })
    if (language) {
      var subtitle = new Subtitle({
        language: str,
        version: subtitle.title,
        comment: subtitle.comment,
        status: language.status,
        downloadLink: language.downloadLink,
        showInfo: subtitles.showInfo
      })
      subtitlesForLanguage.push(subtitle)
    }
  })
  return subtitlesForLanguage
}
