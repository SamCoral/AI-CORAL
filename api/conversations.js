import { db } from "hatchable";
export const access = "user";
export const methods = ["GET","POST"];
export default async function(req,res){
 const uid = req.user.id;
 if(req.method==="POST"){
  const title=String(req.body?.title||"New chat").trim().slice(0,100)||"New chat";
  const model=String(req.body?.model||"gemini").slice(0,50);
  const {rows}=await db.query("INSERT INTO coral_conversations (user_id,title,model) VALUES ($1,$2,$3) RETURNING id,user_id,title,model,created_at,updated_at",[uid,title,model]);
  return res.status(201).json({conversation:rows[0]});
 }
 const {rows}=await db.query("SELECT id,title,model,created_at,updated_at FROM coral_conversations WHERE user_id=$1 AND archived_at IS NULL ORDER BY updated_at DESC LIMIT 100",[uid]);
 res.json({conversations:rows});
}