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
        const queryTab = query.split(';').filter(q => q.trim() !== '')

        for (const q of queryTab) {
            try {
                await dbConnection.query(q)
            } catch (e) {
                console.log('Error executing query:', q, e)
            }
        }

        await dbConnection.end()

        console.log('\n--- Migration Successful ---\n')
    } catch (e) {
        console.log('Migration failed:', e)
    }
}



migrate("./database.sql")