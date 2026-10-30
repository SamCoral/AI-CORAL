import { config } from "hatchable";
export const access = "user";
export const methods = ["GET"];
const choices = [
 {id:"gemini",name:"Gemini Flash"},
 {id:"gemini-pro",name:"Gemini Pro"},
 {id:"gpt",name:"GPT"},
 {id:"gpt-mini",name:"GPT Mini"},
 {id:"sonnet",name:"Claude Sonnet"}
];
export default async function(req,res){
 let selected = "gemini";
 try { selected = await config.get("default_model") || "gemini"; } catch {}
 res.json({models:choices,default_model:selected});
}