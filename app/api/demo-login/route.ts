import { cookies } from 'next/headers';
import { body, db, failure, HttpError } from '@/lib/video-server';
import { getDemoUser, SESSION_COOKIE, tokenHash } from '@/lib/demo-session';
function sameOrigin(request:Request){if(request.headers.get('origin')!==new URL(request.url).origin)throw new HttpError('请求来源无效。',403);}
export async function POST(request:Request){try{
 sameOrigin(request);
 const input=await body(request);
 const name=typeof input.name==='string'?input.name.trim():'';
 if(!name||name.length>40)throw new HttpError('请输入 1–40 字的用户名。');
 // The UI accepts any non-empty password; it is deliberately never transmitted or stored.
 if(input.demoPasswordEntered!==true)throw new HttpError('请输入任意演示密码。');
 const current=await getDemoUser();
 if(current)return Response.json({user:{name:current.fullName}});
 const token=Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');
 await db().prepare('INSERT INTO demo_sessions (id,token_hash,name,expires_at) VALUES (?,?,?,?)').bind(crypto.randomUUID(),await tokenHash(token),name,Date.now()+7*86400000).run();
 (await cookies()).set(SESSION_COOKIE,token,{httpOnly:true,secure:new URL(request.url).protocol==='https:',sameSite:'lax',path:'/',maxAge:7*86400});
 return Response.json({user:{name}});
 }catch(e){return failure(e);}}
export async function DELETE(request:Request){try{
 sameOrigin(request);const jar=await cookies();const token=jar.get(SESSION_COOKIE)?.value;
 if(token)await db().prepare('DELETE FROM demo_sessions WHERE token_hash = ?').bind(await tokenHash(token)).run();
 jar.set(SESSION_COOKIE,'',{httpOnly:true,secure:new URL(request.url).protocol==='https:',sameSite:'lax',path:'/',maxAge:0});
 return Response.json({loggedOut:true});
 }catch(e){return failure(e);}}
