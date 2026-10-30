import { db } from "hatchable";
export const access = "user";
export const methods = ["GET"];
export default async function(req,res){
 const uid=req.user.id,id=req.params.id;
 const c=await db.query("SELECT id FROM coral_conversations WHERE id=$1 AND user_id=$2",[id,uid]);
 if(!c.rows.length)return res.status(404).json({error:"Conversation not found."});
 const {rows}=await db.query("SELECT id,role,content,status,model,created_at FROM coral_messages WHERE conversation_id=$1 AND user_id=$2 ORDER BY created_at ASC LIMIT 500",[id,uid]);
 res.json({messages:rows});
}