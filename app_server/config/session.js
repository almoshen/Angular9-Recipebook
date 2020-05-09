//////////////////
// SESSION CONFIGURATION
//////////////////
require('dotenv').config();
const session = require('express-session');
// Used for production
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const cookieMaxAge = Math.floor(process.env.SESSION_COOKIE_MAX_AGE);

const sessionCookieLocal = async (app) => {
    
    // CONFIGURATION WITH REDIS FOR PRODUCTION
    if (process.env.NODE_ENV === 'production') {
        
        const redisClient    = redis.createClient({
            url       : process.env.REDIS_URL,
            ttl       : 86400 
        });

        redisClient.on('connect', function() {
            console.log(`Redis client connected with ${process.env.REDIS_URL}`);
        });

        redisClient.on('error', (err) => {
            console.log('Redis error: ', err);
        });

        let cookieSecure = false;
        if (process.env.SESSION_COOKIE_SECURE === 'true') {
            cookieSecure = true;
        }

        
        

        app.use(session({
            secret: process.env.SESSION_COOKIE_SECRET,
            name: process.env.SESSION_COOKIE_NAME,
            resave: false,
            saveUninitialized: true,
            cookie: {
                path    : process.env.SESSION_COOKIE_PATH,
                maxAge: cookieMaxAge,
                sameSite: process.env.SESSION_COOKIE_SAME_SITE,
                secure: cookieSecure
            },
            store: new redisStore({ 
                client: redisClient
            }),
        }));
        
    } else if (process.env.NODE_ENV === 'development') {
        // CONFIGURATION MemoryStore FOR DEVELOPMENT
        app.use(session ({
            name: process.env.SESSION_COOKIE_NAME,
            revase: false,
            saveUninitialized: false,
            secret: process.env.SESSION_COOKIE_SECRET,
            cookie: {
                path    : '/',
                maxAge: cookieMaxAge,
                sameSite: false, // 'strict'
                secure: false, //only for production
                
            }
        }))
    } else {
        console.log('The express-session was not initialized');
    }

    
}

// module.exports = logger, middlewareMethod;
module.exports = sessionCookieLocal;
