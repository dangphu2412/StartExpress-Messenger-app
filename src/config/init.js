import express from 'express';
import path from 'path';

import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import routes from '../routes/index';

export default function (app) {
    // view engine setup
    app.set('views', path.join(__dirname, '../resources/views'));
    app.set('view engine', 'pug');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));

    app.use(methodOverride('X-HTTP-Method-Override'));

    app.use(
        methodOverride((req) => {
            if (req.body && typeof req.body === 'object' && '_method' in req.body) {
                const method = req.body._method;
                delete req.body._method;

                return method;
            }

            return undefined;
        }),
    );

    app.use(async (req, res, next) => {
        res.redirectBack = () => {
            const backURL = req.header('Referer') || '/';
            return res.redirect(backURL);
        };

        res.locals.firebaseApiKey = process.env.FIREBASE_API_KEY;
        res.locals.firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
        res.locals.firebaseSenderId = process.env.FIREBASE_SENDER_ID;
        res.locals.firebaseAppId = process.env.FIREBASE_APP_ID;

        next();
    });

    app.use(routes);
}
