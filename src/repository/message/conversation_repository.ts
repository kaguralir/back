import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Interest } from "../../entity/interest/interest_entity";
import { Conversations } from "../../entity/message/conversations_entity";
import { connection } from "../connection";


export class conversations_repository {

    /**
     * @returns {Promise<Conversation[]>} 
     */

    static async getAllMessagesPerMutualInterest(mutual: number) {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM conversations WHERE mutualInterest_id=?', [mutual]);
        return rows;

    }

    static async addMessage(mutualInterest_id: number, sender_id: number, message: String) {
        try {
            await connection.query<ResultSetHeader>('INSERT INTO conversations (mutualInterest_id, sender_id,messageSend) VALUES (?,?,?)', [mutualInterest_id, sender_id, message]);
        }
        catch (err) {
            console.log("adduser repo err is", err)
        }

    }

    static async getOneMutualInterest(interest_id: number) {
        try {
            const [row] = await connection.query<RowDataPacket[]>(`SELECT * FROM interest WHERE interest_id = ?  AND interest=1`, [interest_id]);

            console.log(row);

            if (row.length === 1) {
                return new Interest(row[0]['interest_id'], row[0]['jobApplied_id'], row[0]['candidateWhoApplied_id'], row[0]['recruiterJobOffer_id'], row[0]['interest']);

            }
            return null;
        }
        catch (err) {
            console.log(" get one mutual Interest error", err);

        }

    }
    static async candidateAllMutualInterestPerUser(user_id: number) {
        try {
            const [row] = await connection.query<RowDataPacket[]>(`SELECT * FROM interest WHERE candidateWhoApplied_id = ?  AND interest=1`, [user_id]);

            console.log(row);

            return row;
        }
        catch (err) {
            console.log(" get one mutual Interest error", err);

        }

    }

    static async getInterestProfile(user_id: number) {
        try {
            const [row] = await connection.query<RowDataPacket[]>(`SELECT * FROM interest WHERE candidateWhoApplied_id = ?  AND interest=1`, [user_id]);

            console.log(row);

            return row;
        }
        catch (err) {
            console.log(" get one mutual Interest error", err);

        }

    }
}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */