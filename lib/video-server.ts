import { env } from 'cloudflare:workers';
import { getDemoUser } from '@/lib/demo-session';
import { resolveSeedanceConfig } from '@/lib/seedance-config';
export const runtime = {DB:env.DB!,BUCKET:env.BUCKET!,...resolveSeedanceConfig(env as unknown as Record<string,unknown>)};
export const DEMO_URL='https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
export type Row = {id:string;owner:string;author:string;prompt:string;title:string;status:string;task_id:string|null;video_url:string|null;demo:number;published:number;ratio:string;duration:number;error:string|null;created_at:string};
export class HttpError extends Error {constructor(message:string,public status=400){super(message);}}
export function db(){if(!runtime.DB)throw new HttpError('作品存储暂时不可用，请稍后重试。',503);return runtime.DB;}
export async function identity(request?:Request){const user=await getDemoUser();if(!user)throw new HttpError('请先登录再继续。',401);if(request&&request.method!=='GET'){const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)throw new HttpError('请求来源无效。',403);}return user;}
export async function body(request:Request){if(Number(request.headers.get('content-length')||0)>12000)throw new HttpError('请求内容过长。');const text=await request.text();if(text.length>12000)throw new HttpError('请求内容过长。');try{return JSON.parse(text);}catch{throw new HttpError('请求格式无效。');}}
export async function owned(id:string,owner:string){const v=await db().prepare('SELECT * FROM videos WHERE id = ? AND owner = ?').bind(id,owner).first<Row>();if(!v)throw new HttpError('找不到这支视频。',404);return v;}
export function visible(v:Row){const {owner,task_id,...safe}=v;return safe;}
export function failure(e:unknown){if(e instanceof HttpError)return Response.json({error:e.message},{status:e.status});console.error('Video operation failed',e instanceof Error?e.message:'unknown');return Response.json({error:'暂时无法完成，请稍后重试。你的输入仍然保留。'},{status:503});}
export async function ark(path:string,options:RequestInit={}){if(!runtime.ARK_API_KEY)throw new HttpError('尚未配置 Seedance API 密钥，请先使用演示模式。',503);const r=await fetch('https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks'+path,{...options,headers:{Authorization:`Bearer ${runtime.ARK_API_KEY}`,'Content-Type':'application/json'},signal:AbortSignal.timeout(25000)});if(!r.ok){throw new HttpError(r.status===401||r.status===403?'Seedance 账户或模型权限未就绪，请检查服务端配置。':r.status===429?'Seedance 请求额度受限，请稍后重试。':'Seedance 未接受请求，请检查提示词、模型权限或稍后重试。',502);}return r.json() as Promise<{id?:string;status?:string;content?:{video_url?:string};error?:{message?:string}}> ;}
