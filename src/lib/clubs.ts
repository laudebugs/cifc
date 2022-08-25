import { GoogleSpreadsheet } from 'google-spreadsheet'
import { crawlFBPage } from './crawlFBPage'

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

const SPREADSHEET_ID = process.env.CLUBS_AT_NYU_GOOGLE_SHEETS_ID
import { parse } from 'node-html-parser'

export async function loadNYUClubsSpreadsheet() {
    if (!SPREADSHEET_ID) throw new Error('SPREADSHEET_ID not set')
    if (!GOOGLE_API_KEY) throw new Error('GOOGLE_API_KEY not set')

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID)
    await doc.useApiKey(GOOGLE_API_KEY)
    await doc.loadInfo()

    const clubData = await doc.sheetsByIndex[0].getRows()
    const headerValues = await doc.sheetsByIndex[0].headerValues
    const clubs = clubData.map(({ _rawData }) => {
        const club = {}
        headerValues.forEach((header, index) => {
            club[header] = _rawData[index]
        })
        return club
    })
    console.log(clubs)
    let html = await crawlFBPage(clubs[0]['Facebook'])
    // console.log(html)
    // const root = parse(html)
    // root.getElementsByTagName("img")
    // console.log(root.getElementsByTagName("img").find((ele)=> ele.rawAttrs.includes('data-imgperflogname="profileCoverPhoto"')))
    require('fs').writeFileSync('./clubs.html', html)
    return clubs
}
