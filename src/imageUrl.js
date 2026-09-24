import { createImageUrlBuilder } from '@sanity/image-url'
import client from './client.js'

const builder = createImageUrlBuilder(client)

export function imageUrl(source, width) {
    return builder.image(source).width(width).auto('format').url()
}

export function imageSrcSet(source, widths) {
    return widths.map((width) => `${imageUrl(source, width)} ${width}w`).join(', ')
}
