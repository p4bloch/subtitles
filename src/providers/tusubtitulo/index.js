import { findTvShowByName } from './helpers'
import { indexCache, findSubtitlesForEpisode, findSubtitlesForLanguage } from './data'

const find = (options, cb) => {
  const { showName, season, episode, language } = options
  findTvShowByName(showName)
  .then((tvShow) => findSubtitlesForEpisode(tvShow, season, episode))
  .then((subtitles) => {
    const subs = findSubtitlesForLanguage(language, subtitles)
    console.log('subs', subs);
    cb(subs)
  })
}

export default {
  name: 'tusubtitulo',
  types: ['episode'],
  languages: ['es_es', 'es_la'],
  find: find
}
