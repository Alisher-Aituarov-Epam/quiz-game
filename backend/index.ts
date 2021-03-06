import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { difficultyRouter } from './src/routes/difficulty';
import { genreRouter } from './src/routes/genre';
import { questionRouter } from './src/routes/question';
import { userRouter } from './src/routes/user';
import { quizRouter } from './src/routes/quiz';
import fileUpload from 'express-fileupload';
import path from 'path';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(
	fileUpload({
		createParentPath: true,
		limits: {
			fileSize: 1024 * 1024 * 1024, //1 MB max file(s) size
		},
	})
);
app.use('/uploads', express.static(process.cwd() + '/uploads'));

app.use('/users', userRouter);
app.use('/difficulties', difficultyRouter);
app.use('/genres', genreRouter);
app.use('/questions', questionRouter);
app.use('/quizzes', quizRouter);

const PORT = 4000;

const server = app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
