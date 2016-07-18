import { findTvShowByName } from './helpers'
import { indexCache, findSubtitlesForEpisode, findSubtitlesForLanguage } from './data'

const find = (options) => {
  return new Promise((resolve, reject) => {
    const { showName, season, episode, language } = options
    findTvShowByName(showName)
    .then((tvShow) => findSubtitlesForEpisode(tvShow, season, episode))
    .then((subtitles) => resolve(findSubtitlesForLanguage(language, subtitles)))
  })
}

export default {
  name: 'tusubtitulo',
  types: ['episode'],
  languages: ['es_es', 'es_la'],
  find: find
}
