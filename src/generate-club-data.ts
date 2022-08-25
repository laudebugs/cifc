require('dotenv').config()

import { loadNYUClubsSpreadsheet } from './lib/clubs'
import { writeFileSync } from 'fs'

loadNYUClubsSpreadsheet().then((clubs) => {
    writeFileSync('./clubs.json', JSON.stringify(clubs, null, 2))
})
