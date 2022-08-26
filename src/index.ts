require('dotenv').config()

import { generateClubData } from './lib/generate-club-data'
import { writeFileSync } from 'fs'
import { compressImages } from './lib/compress-images'
import { generateSquareSpaceScript } from './lib/squarespace'

compressImages().then(() => {
    generateClubData().then((clubs) => {
        writeFileSync('./out/clubs.json', JSON.stringify(clubs, null, 2))
        generateSquareSpaceScript()
    })
})
