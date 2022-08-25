require('dotenv').config()

import { loadNYUClubsSpreadsheet } from './lib/clubs'
import { writeFileSync } from 'fs'
import { compressImages } from './lib/compress-images'

compressImages()
loadNYUClubsSpreadsheet().then((clubs) => {
    writeFileSync('./out/clubs.json', JSON.stringify(clubs, null, 2))
})
