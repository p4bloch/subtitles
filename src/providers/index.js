import addic7ed from './addic7ed'
import opensubtitles from './opensubtitles'
import tusubtitulo from './tusubtitulo'

const providers = [
    addic7ed,
    opensubtitles,
    tusubtitulo
]

const all = providers

const findByName = (name) => {
    return providers.filter((provider) => {
        if (provider.name == name) return provider
    })[0]
}

export default {
  all: providers,
  findByName: findByName
}
