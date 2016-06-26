import _ from 'lodash'
import path from 'path'
import fs from 'fs'
import fuzzy from 'fuzzy'
import { indexCache, updateIndex } from './data'
import Xray from 'x-ray'
var x = Xray()

export function getIndex() {
  return new Promise((resolve, reject) => {
    var data = fs.readFileSync(indexCache, 'utf8')
    if (!data) {
      updateIndex().then((data)=> {
        resolve(JSON.parse(data))
      })
    }
    resolve(JSON.parse(data))
  })
}

export function findTvShowByName(name) {
  return getIndex().then((tvShows) => {
    const names = tvShows.map(s => s.name)
    const tvShowName = fuzzy.filter(name, names).length && fuzzy.filter(name, names)[0].string
    return tvShows.find(o => o.name == tvShowName)
  })
}
