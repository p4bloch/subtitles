import path from 'path'
import slug from 'slug'
import { log } from '../../output'
import config from '../../config'
import Subtitle from './Subtitle'

var x = require('x-ray')({
  filters: {
    clean: (value) => typeof value === 'string' ? value.replace(/(\r\n|\n|\r)/gm,"").replace(/ +(?= )/g,'').trim() : value
  }
})

export const indexCache = path.resolve('./cache/tvShows.json')

export const updateIndex = (cb) => {
  return new Promise((resolve, reject) => {
    x('http://www.tusubtitulo.com/series.php', 'td.line0', [{
        name: 'a@html',
        link: 'a@href',
      }])
      .write(indexCache)
      ((err, res) => {
        if (err) (reject(err))
        resolve(res)
      })
  })
}

export function getEpisodeUrl(TvShow, season, episode) {
  let tvShowId = TvShow.link.split('/').pop()
  return 'http://www.tusubtitulo.com/serie/' + slug(TvShow.name) + '/' + season + '/' + episode + '/' + tvShowId + '/'
}

export const findSubtitlesForEpisode = (TvShow, season, episode) => {
  const url = getEpisodeUrl(TvShow, season, episode)
  config.debug && log("Downloading from " + url)
  return getSubtitlesFromUrl(url, { TvShow, season, episode })
}

function getSubtitlesFromUrl(url, showInfo) {
  return new Promise((resolve, reject) => {
    x(url, '#content .ssdiv', [{
      title: '.title-sub | clean',
      comment: 'span.comentario | clean',
      languages: x('.sslist', [{
        language: '.li-idioma | clean',
        status: '.li-estado | clean',
        downloadLink: '.download a:nth-child(2)@href'
      }])
    }])((err, subtitles) => {
      if (err) reject()
      else resolve({data: subtitles.filter( s => s.languages.length), showInfo})
    })
  })
}

export function findSubtitlesForLanguage (language, subtitles) {
  // find subtitles with received language
  let subtitlesWithLanguage = subtitles.data.filter( s => s.languages.find( l => l.language == getLanguage(language)))
  // leave only received language in `languages` array
  subtitlesWithLanguage.forEach( s => s.languages = s.languages.filter(l => l.language == getLanguage(language)))

  var subtitlesForLanguage = []
  subtitlesWithLanguage.forEach( subtitle => {
    var sub = new Subtitle({
      language: language,
      version: subtitle.title,
      comment: subtitle.comment,
      status: subtitle.languages[0].status,
      downloadLink: subtitle.languages[0].downloadLink,
      showInfo: subtitles.showInfo
    })
    subtitlesForLanguage.push(sub)
  })
  return subtitlesForLanguage
}

function getLanguage(language) {
  switch (language) {
    case 'es_es':
      return "Español (España)"
    case 'es_la':
      return "Español (Latinoamérica)"
  }
}
