import path from 'path'
import _ from 'lodash'
import Xray from 'x-ray'
import { log } from 'output'
var x = Xray()

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

const getEpisodeUrl = (TvShow, season, episode) => {
  let tvShowId = _.last(TvShow.link.split('/'))
  return 'http://www.tusubtitulo.com/serie/' + _.kebabCase(TvShow.name) + '/' + season + '/' + episode + '/' + tvShowId + '/'
}


export const findSubtitlesForEpisode = (TvShow, season, episode) => {
  const url = getEpisodeUrl(TvShow, season, episode)
  log("Downloading from ", url)
  return new Promise((resolve, reject) => {
    x(url, '#content', [{
      title: '.title-sub',
      comment: 'span.comentario',
      languages: x('.sslist', [{
        language: '.li-idioma',
        status: '.li-estado',
        downloadLink: '.download a:nth-child(2)@href'
      }])
    }])((err, subtitles) => {
      console.log('subssss', subtitles.length);
      if (err) reject()
      else resolve({data: subtitles, showInfo: { TvShow, season, episode }})
    })
  })
}

export const findSubtitlesForLanguage = (language, subtitles) => {
  console.log('language', language);
  console.log('subtitles', subtitles);

  let languageStr
  switch (language) {
    case 'es_es':
    languageStr = "Español (España)"
    case 'es_la':
    languageStr = "Español (Latinoamérica)"
  }
  console.log('languageStr', languageStr);

  var subtitlesForLanguage = []
  subtitles.data.forEach((subtitle) => {
    console.log(subtitle);
    let language = _.find(subtitle.languages, (l) => {
      return _.trim(l.language) == languageStr
    })
    if (language) {
      var subtitle = new Subtitle({
        language: languageStr,
        version: subtitle.title,
        comment: subtitle.comment,
        status: language.status,
        downloadLink: language.downloadLink,
        showInfo: subtitles.showInfo
      })
      subtitlesForLanguage.push(subtitle)
    }
    console.log('subtitlesForLanguage', subtitlesForLanguage);
  })
  console.log('fuera del forEach', subtitlesForLanguage);
  return subtitlesForLanguage
}
