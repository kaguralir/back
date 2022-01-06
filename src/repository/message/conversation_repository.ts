import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Conversations } from "../../entity/message/conversations_entity";
import { connection } from "../connection";


export class conversations_repository {

    /**
     * @returns {Promise<Conversation[]>} 
     */

    static async getAllMessagesPerMutualInterest(mutual:number) {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM conversations WHERE mutualThumbsUp=?', [mutual]);
        if (rows.length === 1) {
            return new Conversations({conversation_id:rows[0].conversation_id, mutualThumbsUp_id:rows[0]. mutualThumbsUp_id, recruiterMessaging_id: rows[0].recruiterMessaging_id, candidateMessaging_id: rows[0].candidateMessaging_id, messageSend: rows[0].messageSend,sendDate: rows[0].sendDate
            });
        }
        return null;

    }

    static async addMessage(message:Conversations,  mutualityId,recruiterId, candidatId) {
        try{
        const [addedMessage] = await connection.query<ResultSetHeader>('INSERT INTO conversations (mutualThumbsUp_id, recruiterMessaging_id, candidateMessaging_id, email,password, messageSend, sendDates) VALUES (?,?,?,?,?)', [mutualityId.mutualThumbsUp_id,recruiterId.recruiterMessaging_id,candidatId.candidateMessaging_id,message.messageSend,message.sendDate]);
         message.conversation_id = addedMessage.insertId;
    }
        catch(err){
            console.log("adduser repo err is", err)
        }

    }
}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */