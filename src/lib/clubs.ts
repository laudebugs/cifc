import { GoogleSpreadsheet } from 'google-spreadsheet'

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

const SPREADSHEET_ID = process.env.SPREADSHEET_ID

export async function loadNYUClubsSpreadsheet() {
    if (!SPREADSHEET_ID) throw new Error('SPREADSHEET_ID not set')
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID)
    if (!GOOGLE_API_KEY) throw new Error('GOOGLE_API_KEY not set')
    await doc.useApiKey(GOOGLE_API_KEY)
    await doc.loadInfo()
    return doc
}
