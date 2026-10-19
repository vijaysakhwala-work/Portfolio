import {sqliteTable,text,integer,index,uniqueIndex} from 'drizzle-orm/sqlite-core';
export const enquiries=sqliteTable('enquiries',{
 id:text('id').primaryKey(),requestId:text('request_id').notNull(),reference:text('reference').notNull(),createdAt:integer('created_at').notNull(),clientHash:text('client_hash').notNull(),name:text('name').notNull(),email:text('email').notNull(),company:text('company').notNull(),phone:text('phone').notNull(),service:text('service').notNull(),budget:text('budget').notNull(),message:text('message').notNull(),source:text('source').notNull(),consent:integer('consent').notNull(),emailStatus:text('email_status').notNull()
},table=>[uniqueIndex('enquiries_request_id').on(table.requestId),index('enquiries_client_time').on(table.clientHash,table.createdAt)]);
