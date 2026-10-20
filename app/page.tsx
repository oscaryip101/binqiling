import Studio from './studio';
import { getDemoUser } from '@/lib/demo-session';
import { env } from 'cloudflare:workers';
import { resolveSeedanceConfig } from '@/lib/seedance-config';
export const dynamic = 'force-dynamic';
export default async function Home() {
 const user = await getDemoUser();
 return <Studio user={user ? {name:user.fullName || user.email.split('@')[0]} : null} configured={Boolean(resolveSeedanceConfig(env as unknown as Record<string,unknown>).ARK_API_KEY)} />;
}
