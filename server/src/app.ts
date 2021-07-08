import express from 'express';
import taskRouter from './routers/tasks';
import listRouter from './routers/lists';
import authRouter from './routers/auth';
import journalEntryRouter from './routers/journalEntry';
import statRouter from './routers/stats';
import habitRouter from './routers/habits';
import likeRouter from './routers/likes';
import commentRouter from './routers/comments';
import fontRouter from './routers/readableFont';
import friendRouter from './routers/friends';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 })
);

app.use('/api/tasks', taskRouter);
app.use('/api/lists', listRouter);
app.use('/api/auth', authRouter);
app.use('/api/journalEntries', journalEntryRouter);
app.use('/api/stats', statRouter);
app.use('/api/habits', habitRouter);
app.use('/api/likes', likeRouter);
app.use('/api/comments', commentRouter);
app.use('/api/font', fontRouter);
app.use('/api/friends', friendRouter);

export default app;
