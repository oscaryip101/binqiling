import { cookies } from 'next/headers';
import { env } from 'cloudflare:workers';
export const SESSION_COOKIE = 'seed_demo_session';
export async function tokenHash(token:string) {
 const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token));
 return Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
}
export async function getDemoUser(){
 const token=(await cookies()).get(SESSION_COOKIE)?.value;
 if(!token||!/^([a-f0-9]{64})$/.test(token)||!env.DB)return null;
 const session=await env.DB.prepare('SELECT id, name FROM demo_sessions WHERE token_hash = ? AND expires_at > ?').bind(await tokenHash(token),Date.now()).first<{id:string;name:string}>();
 return session?{userId:'demo:'+session.id,fullName:session.name,displayName:session.name,email:''}:null;
}
