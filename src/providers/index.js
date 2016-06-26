import tusubtitulo from './tusubtitulo'

const providers = [
    tusubtitulo
]

export const all = providers

export const findByName = (name) => {
    return providers.find(provider => provider.name == name)
}
