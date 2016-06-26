import {getEpisodeUrl} from './helpers'
import request from 'request'
import fs from 'fs'

export default class Subtitle {
  constructor({language, version, info, status, downloadLink, showInfo}) {
    this.language = language
    this.version = version
    this.info = info
    this.status = status
    this.downloadLink = downloadLink
    this.referer = getEpisodeUrl(showInfo.TvShow, showInfo.season, showInfo.episode)
  }

  download(path) {
    request({
      url: this.downloadLink,
      headers: {
        'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Upgrade-Insecure-Requests": 1,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36",
        'Referer': this.referer,
        'Accept-Encoding': "gzip, deflate, sdch",
        'Accept-Language': "en-US,en;q=0.8,es;q=0.6,pt;q=0.4,gl;q=0.2,it;q=0.2",
      }
    }).pipe(fs.createWriteStream(path))
  }
}
