import sharp from 'sharp'
import { readdir } from 'fs'
import slug from 'slug'

/* Read all images from assets/covers folder and compress */
export async function compressImages() {
    // Read all files in directory
    const files = await new Promise<string[]>((resolve, reject) => {
        readdir('./assets/covers', (err, files) => {
            if (err) {
                reject(err)
            } else {
                resolve(files)
            }
        })
    })

    // Compress each image
    for (const file of files) {
        const [filename, extension] = file.split('.')
        await sharp(`./assets/covers/${file}`)
            /* Resize to a 16:9 ratio */
            .resize(16 * 40, 9 * 40)
            .jpeg({ mozjpeg: true })
            .toFile(`./out/covers/${slug(filename)}.jpeg`)
    }
}
