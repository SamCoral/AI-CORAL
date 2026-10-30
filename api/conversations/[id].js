import { db } from "hatchable";
export const access = "user";
export const methods = ["GET","PATCH","DELETE"];
export default async function(req,res){
 const uid=req.user.id,id=req.params.id;
 const found=await db.query("SELECT id,title,model,created_at,updated_at FROM coral_conversations WHERE id=$1 AND user_id=$2",[id,uid]);
 if(!found.rows.length)return res.status(404).json({error:"Conversation not found."});
 if(req.method==="GET")return res.json({conversation:found.rows[0]});
 if(req.method==="PATCH"){
  const title=String(req.body?.title||"").trim().slice(0,100);
  if(!title)return res.status(400).json({error:"A title is required."});
  const {rows}=await db.query("UPDATE coral_conversations SET title=$1,updated_at=now() WHERE id=$2 AND user_id=$3 RETURNING id,title,model,created_at,updated_at",[title,id,uid]);
  return res.json({conversation:rows[0]});
 }
 await db.query("DELETE FROM coral_conversations WHERE id=$1 AND user_id=$2",[id,uid]);
 res.json({ok:true});
}