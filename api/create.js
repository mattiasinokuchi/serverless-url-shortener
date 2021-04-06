// Import Dependencies
const url = require('url')
const MongoClient = require('mongodb').MongoClient
const dns = require('dns');
const dnsPromises = dns.promises;

// Create cached connection variable
let cachedDb = null

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
async function connectToDatabase(uri) {
    // If the database connection is cached,
    // use it instead of creating a new connection
    if (cachedDb) {
        return cachedDb
    }

    // If no connection is cached, create a new one
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // Select the database through the connection,
    // using the database path of the connection string
    const db = await client.db(url.parse(uri).pathname.substr(1))

    // Cache the database connection and return the connection
    cachedDb = db
    return db
}

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (req, res) => {

    // Get a database connection, cached or otherwise,
    // using the connection string environment variable as the argument
    const db = await connectToDatabase(process.env.DB_URI);

    // Select the "users" collection from the database
    const collection = await db.collection('urls')

    try {
        // ...check URL...
        const url = new URL(req.body.url);
        await dnsPromises.lookup(url.hostname);
        // ...finds a free number in the database...
        const number = await collection.estimatedDocumentCount({});
        // ...creates a new object...
        const document = {
            original_url: url.hostname,
            short_url: number,
            href: url.href
        };
        // ...inserts it in MongoDB...
        const insert = await collection.insertOne(document);
        // ...responds...
        res.json(insert.ops);
        // ...or logs an error
    } catch (error) {
        if (error.code === "ENOTFOUND" || "ERR_INVALID_URL") {
            res.json({ error: "Invalid URL!" });
        } else {
            console.log(error);
        }
    }
}
