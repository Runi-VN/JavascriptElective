import * as mongo from "mongodb";
const MongoClient = mongo.MongoClient;
const uri = "mongodb+srv://dev:ax2@fullstack-rykz3.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//https://docs.mongodb.com/guides/
async function insertAndReadData() {
    try {
        await client.connect();
        const db = client.db('test');
        await db.collection('inventory').drop()
        const result = await db.collection('inventory').insertOne({
            item: 'canvas',
            qty: 100,
            tags: ['cotton'],
            size: { h: 28, w: 35.5, uom: 'cm' }
        })
        // console.log("Count: ", result.insertedCount);
        // console.log("ID: ", result.insertedId);
        // console.log("Object: ", result.ops);
        // const myCursor = db.collection('inventory').find({})
        // myCursor.forEach((element: any) => {
        //     if (element) console.log(element);
        // });
        let results = await db.collection('inventory').find({}).toArray()
        console.log(results);
    } catch (err) {
        console.log("UPPS --->", err)
    }
    finally {
        client.close();
        console.log("Connection Closed")
    }
}


async function connectSetupDataAndGetDB() {
    await client.connect();
    const db = client.db('test');
    await db.collection('inventory').drop()
    await db.collection('inventory').insertMany([
        { "item": "journal", "qty": 25, "size": { "h": 14, "w": 21, "uom": "cm" }, "status": "A" },
        { "item": "notebook", "qty": 50, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "A" },
        { "item": "paper", "qty": 100, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "D" },
        { "item": "planner", "qty": 75, "size": { "h": 22.85, "w": 30, "uom": "cm" }, "status": "D" },
        { "item": "postcard", "qty": 45, "size": { "h": 10, "w": 15.25, "uom": "cm" }, "status": "A" }
    ]);
    return db;
}
async function readDataWithQueries() {
    try {
        const db = await connectSetupDataAndGetDB();
        let result = await db.collection('inventory').find({ status: "D" }).toArray();
        console.log(result);

        //Query using embedded documents
        result = await db.collection('inventory').find({
            size: { h: 14, w: 21, uom: "cm" }
        }).toArray();
        console.log('-------------NEXT------------');
        console.log(result);

        //Query with dot notation
        result = await db.collection('inventory').find({
            "size.uom": "in"
        }).toArray();
        console.log('-------------NEXT------------');
        console.log(result);

    } catch (err) {
        console.log("UPPS --->", err)
    }
    finally {
        client.close();
        console.log("Closes connection")
    }
}

async function readWithOptions() {
    try {
        const db = await connectSetupDataAndGetDB();
        let result = await db.collection('inventory').find(
            {},
            {
                projection: { item: 1, qty: 1, _id: 0 },
                limit: 3,
                sort: { qty: -1 }
            }
        ).toArray()
        console.log(result);

    } catch (err) {
        console.log("UPPS --->", err)
    }
    finally {
        client.close();
        console.log("Closes connection")
    }
}

async function readDataWithOperatorsAndCompoundQueries() {
    try {
        const db = await connectSetupDataAndGetDB();
        let result = await db.collection('inventory').find({
            "size.h": { $lt: 15 }
        }).toArray();
        //console.log("Ex1, less than:", result);

        result = await db.collection('inventory').find({
            status: "A",
            qty: { $lt: 30 }
        }).toArray();
        //console.log('ex2, AND query:', result);

        result = await db.collection('inventory').find({
            $or: [{ status: "A" }, { qty: { $lt: 30 } }]
        }).toArray();
        // console.log('ex3, OR query:', result);

        result = await db.collection('inventory').find({
            status: "A",
            $or: [{ qty: { $lt: 30 } }, { item: { $regex: "^p" } }]
        }).toArray(); //status A - qty is either less than 30 or item starts with p
        console.log('ex4, AND, OR & regex query:', result);

    } catch (err) {
        console.log("UPPS --->", err)
    }
    finally {
        client.close();
        console.log("Closes connection")
    }
}
async function updateData() {
    try {
        const db = await connectSetupDataAndGetDB();
        let result = await db.collection('inventory').findOneAndUpdate(
            { item: "paper" },
            {
                $set: { "size.uom": "cm", status: "P" },
                $currentDate: { lastModified: true }
            },
            {
                returnOriginal: false
            })
        //console.log('update1', result.value);
        const res = await db.collection('inventory').updateMany(
            { qty: { $lt: 50 } },
            {
                $set: { "size.uom": "in", status: "P" },
                $currentDate: { lastModified: true }
            })
        //console.log("update2a", res.result);
        console.log("update2", res.modifiedCount);

    } catch (err) {
        console.log("UPPS --->", err)
    }
    finally {
        client.close();
        console.log("Closes connection")
    }

}
async function deleteData() {
    try {
        const db = await connectSetupDataAndGetDB();

        // let result = await db.collection('inventory').findOneAndDelete({
        //     status: "D"
        // })
        // console.log('delete1', result.value);
        let result = await db.collection('inventory').deleteMany({
            status: "A"
        })
        console.log("delete2", result.deletedCount);
    } catch (err) {
        console.log("UPPS --->", err)
    }
    finally {
        client.close();
        console.log("Closes connection")
    }
}
//insertAndReadData();
//readDataWithQueries();
//readWithOptions()
//readDataWithOperatorsAndCompoundQueries();
//updateData()
deleteData()