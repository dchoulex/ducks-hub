// import dependencies and initialize express
import express from 'express';
import session from 'express-session'
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
// Import routers
import postRouter from "./routes/post-route.js";
import loginRouter from "./routes/login-route.js";
import organizationRouter from "./routes/organization-route.js";
import commentRouter from "./routes/comment-route.js";
import likeRouter from "./routes/like-route.js";
import followRouter from "./routes/follow-route.js";
import profileRouter from "./routes/profile-route.js";
import bookmarkRouter from "./routes/bookmark-route.js";
import popularRouter from "./routes/popular-route.js";
import recommendRouter from "./routes/recommend-route.js";
import userRouter from "./routes/user-route.js";
import searchRouter from "./routes/search-route.js";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// if production, enable helmet
/* c8 ignore next 3  */
if (process.env.VCAP_APPLICATION) {
  app.use(helmet());
}

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
    httpOnly: true,
    secure: false,
    maxage: 1000 * 60 * 30
    }
}))

//CORS対応
app.use(cors());

// enable parsing of http request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/organizations", organizationRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/follow", followRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/bookmark", bookmarkRouter);
app.use("/api/v1/popular", popularRouter); 
app.use("/api/v1/recommend", recommendRouter); 
app.use("/api/v1/user", userRouter);
app.use("/api/v1/search", searchRouter);

export default app;