import { GoogleSpreadsheet } from 'google-spreadsheet'
import slug from 'slug'
import { existsSync } from 'fs'
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

const SPREADSHEET_ID = process.env.CLUBS_AT_NYU_GOOGLE_SHEETS_ID

export async function generateClubData() {
    if (!SPREADSHEET_ID) throw new Error('SPREADSHEET_ID not set')
    if (!GOOGLE_API_KEY) throw new Error('GOOGLE_API_KEY not set')

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID)
    await doc.useApiKey(GOOGLE_API_KEY)
    await doc.loadInfo()

    const clubData = await doc.sheetsByIndex[0].getRows()
    const headerValues = await doc.sheetsByIndex[0].headerValues

    return clubData
        .map(({ _rawData }) => {
            const club = {}
            headerValues.forEach((header, index) => {
                club[header] = _rawData[index]
            })
            return club
            // Add the club image to the data
        })
        .map((club) => {
            let clubCover = slug(`${club['Name']}`)
            // Check if file exists
            if (!existsSync(`out/covers/${clubCover}.jpeg`)) {
                club['cover'] = 'default.jpeg'
            } else club['cover'] = `${slug(club['Name'])}.jpeg`

            return club
        })
}
