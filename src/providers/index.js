import tusubtitulo from './tusubtitulo'

const providers = [
    tusubtitulo
]

export const all = providers

export const findByName = (name) => {
    return providers.filter((provider) => {
        if (provider.name == name) return provider
    })[0]
}
