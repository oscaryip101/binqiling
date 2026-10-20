import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
export const videos = sqliteTable('videos', {
 id:text('id').primaryKey(), owner:text('owner').notNull(), author:text('author').notNull(),
 prompt:text('prompt').notNull(), title:text('title').notNull().default(''),
 status:text('status').notNull(), taskId:text('task_id'), videoUrl:text('video_url'),
 demo:integer('demo').notNull().default(0), published:integer('published').notNull().default(0),
 ratio:text('ratio').notNull(), duration:integer('duration').notNull(),
 error:text('error'), createdAt:text('created_at').notNull(),
}, t=>[index('idx_videos_owner_created').on(t.owner,t.createdAt),index('idx_videos_published_created').on(t.published,t.createdAt)]);

// Temporary browser sessions for the mock login. No credentials are collected.
export const demoSessions = sqliteTable('demo_sessions', {
 id:text('id').primaryKey(), tokenHash:text('token_hash').notNull().unique(),
 name:text('name').notNull(), expiresAt:integer('expires_at').notNull(),
});
