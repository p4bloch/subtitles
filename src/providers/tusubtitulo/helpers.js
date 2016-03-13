import _ from 'lodash'
import path from 'path'
import fs from 'fs'
import fuzzy from 'fuzzy'

const indexCache = path.resolve('./cache/tvShows.json')

export function getEpisodeUrl(TvShow, season, episode) {
  let tvShowId = _.last(TvShow.link.split('/'))
  return 'http://www.tusubtitulo.com/serie/new-girl/' + season + '/' + episode + '/' + tvShowId + '/'
}

export function updateIndex() {
  x('http://www.tusubtitulo.com/series.php', 'td.line0', [{
      name: 'a@html',
      link: 'a@href',
    }])
    .write(indexCache)
}

export function getIndex() {
  return JSON.parse(fs.readFileSync(indexCache, 'utf8'))
}

export function findTvShowByName(name) {
  let tvShows = getIndex();
  var names = []
  tvShows.forEach((s) => {
    names.push(s.name)
  })
  let tvShowName = fuzzy.filter(name, names).length ? fuzzy.filter(name, names)[0].string : ''
  return _.find(tvShows, (o) => {
    return o.name == tvShowName;
  })
}
