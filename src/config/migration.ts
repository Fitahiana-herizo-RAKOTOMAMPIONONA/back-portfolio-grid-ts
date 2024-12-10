import { config } from 'dotenv'
import { readFile } from 'fs/promises'
import mysql from 'mysql2/promise'

config()

const { DB_HOST, DB_USERNAME, DB_PORT, DB_PASSWORD, DB_NAME } = process.env

export const dbConnection = mysql.createPool({
    user: DB_USERNAME,
    port: DB_PORT,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_NAME,
} as mysql.PoolOptions)

export async function migrate(filename: string) {
    console.log('\n--- Migration Start ---\n')

    try {
        const query = await readFile(filename, { encoding: 'utf-8' })
        const queryTab = query.split(';')
        queryTab.pop()

        queryTab.forEach(async q => {
            try { await dbConnection.query(q) }
            catch (e) { console.log(e) }
        })

        //await dbConnection.end()

        console.log('\n--- Migration Successful ---\n')
    } catch (e) {
        console.log(e)
    }
}
