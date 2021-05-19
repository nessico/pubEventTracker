const mongoose = require('mongoose')
const Schema = mongoose.Schema
const fs = require('fs');
const json2csv = require('json2csv').parse;
const path = require('path')
const os = require('os');

const EventSchema = new Schema(
    {
        PantherID: { type: String, required: false },
        FirstName: { type: String, required: false },
        LastName: { type: String, required: false },
        Department: { type: String, required: false },
        Level: { type: String, required: false },
        Campus: { type: String, required: false },
        Degree: { type: String, required: false },
        Email: { type: String, required: false },
        College: { type: String, required: false },
        Year: { type: String, required: false },
        checkin: { type: Boolean, required: false },
    },
    { timestamps: true },
)
const Event = mongoose.model('event', EventSchema)

createEvent = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an event',
        })
    }

    const event = new Event(body)

    if (!event) {
        return res.status(400).json({ success: false, error: err })
    }

    event
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: event._id,
                message: 'Event created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Event not created!',
            })
        })
}
createTable = async (req, res) => {
    const mongoose = require('mongoose')
    const Schema = mongoose.Schema
    console.log("create db")
    const Event = new Schema(
        {
            PantherID: { type: String, required: false },
            FirstName: { type: String, required: false },
            LastName: { type: String, required: false },
            Department: { type: String, required: false },
            Level: { type: String, required: false },
            Campus: { type: String, required: false },
            Degree: { type: String, required: false },
            Email: { type: String, required: false },
            College: { type: String, required: false },
            Year: { type: String, required: false },
            checkin: { type: Boolean, required: false },
        },
        { timestamps: true },
    )

    const body = req.body
    const filler = Object.keys(body);
    console.log(filler[0]);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an event name',
        })
    } else if (filler[0]) {
        //create new collection with user defined name
        const New = mongoose.model(`${filler[0]}`, Event);
        New.createCollection()
        .then(function (collection) {
            console.log('Collection is created!');
            return res.status(200).json({
                success: true,
                id: event._id,
                message: 'Event table created!',
            })
        })
        .catch(error => {
            return res.status(404).json({
                error,
                message: 'Event table not created!',
            })
        })
    }
    
    
}

updateEvent = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    console.log(req.params)
    const test = mongoose.model(`${req.params.page}`, EventSchema)
    test.findOne({ _id: req.params.id }, (err, event) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Event not found!',
                
            })
            console.log("Failed to Find");
        }

        event.name = body.name
        event.time = body.time
        event.rating = body.rating
        console.log(body.checkin)
        
        if (body.checkin == true) {
            event.checkin = false
        } else if (body.checkin == false) {
            event.checkin = true
        }
        console.log("checkin:"+event.checkin)
        event
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: event._id,
                    message: 'Event updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Event not updated!',
                })
            })
    })
}
updateEventByFile = async (req, res) => {
    const mongoose = require('mongoose')
    const Schema = mongoose.Schema

    const Event = new Schema(
        {
            PantherID: { type: String, required: false },
            FirstName: { type: String, required: false },
            LastName: { type: String, required: false },
            Department: { type: String, required: false },
            Level: { type: String, required: false },
            Campus: { type: String, required: false },
            Degree: { type: String, required: false },
            Email: { type: String, required: false },
            College: { type: String, required: false },
            Year: { type: String, required: false },
            checkin: { type: Boolean, required: false },
        },
        { timestamps: true },
    )
    const test = mongoose.model(`${req.params.page}`, EventSchema)
    const body = req.body
    const filler = Object.keys(body);
    //console.log(body)
    
    filler[0] = `[${filler[0]}] `
    const final = filler[0]
    console.log({final});
    //console.log(req.params)
    try {
        test.insertMany(JSON.parse(final), function (error, docs) {
            console.log("doing stuff...")
            if (error) {
                console.log("Uh-oh", error)
                return res.status(400).json({ success: false, error: error })
            } else {
                return res.status(200).json({ success: true })
            }
        });
    }
    catch(error) {console.log("oops!") }
}
deleteEvent = async (req, res) => {
    await Event.findOneAndDelete({ _id: req.params.id }, (err, event) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!event) {
            return res
                .status(404)
                .json({ success: false, error: `Event not found` })
        }

        return res.status(200).json({ success: true, data: event })
    }).catch(err => console.log(err))
}

getEventById = async (req, res) => {
    await Event.findOne({ _id: req.params.id }, (err, event) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: event })
    }).catch(err => console.log(err))
}

getEvents = async (req, res) => {
    const test = mongoose.model(`${req.params.page}`, EventSchema)

    await test.find({}, (err, events) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!events.length) {
            return res
                .status(404)
                .json({ success: false, error: `Event not found` })
        }
        return res.status(200).json({ success: true, data: events })
    }).catch(err => console.log(err))
}

getTables = async (req, res) => {
    const mongoose = require('mongoose')
    console.log("Starting connection")
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        }
        else {
            names.forEach(function (e, i, a) {
                console.log("--->>", e.name);
            });
            return res.status(200).json({ names })
        }
    });
}

getCSV = async (req, res) => {
    const test = mongoose.model(`${req.params.page}`, EventSchema)

    test.find({}, function (err, events) {
        if (err) {
            return res.status(500).json({ err });
        }
        else {
            console.log("found db")
            let csv
            try {
                csv = json2csv(events, {});
            } catch (err) {
                return res.status(500).json({ err });
            }
            const filePath = path.join(os.homedir(), "Desktop/csv-" + req.params.page + ".csv")
            fs.writeFile(filePath, csv, function (err) {
                if (err) {
                    return res.json(err).status(500);
                }
                else {
                    console.log(filePath)
                    /*setTimeout(function () {
                        fs.unlinkSync(filePath); // delete this file after 30 seconds
                    }, 30000)*/
                    return res.status(200).json({ success: true, data: events })
                }
            });
        }
    })
}
getXLS = async (req, res) => {
    const test = mongoose.model(`${req.params.page}`, EventSchema)

    test.find({}, function (err, events) {
        if (err) {
            return res.status(500).json({ err });
        }
        else {
            console.log("found db")
            let xls
            try {
                xls = json2csv(events, {});
            } catch (err) {
                return res.status(500).json({ err });
            }
            const filePath = path.join(os.homedir(), "Desktop/xls-" + req.params.page + ".xls")
            fs.writeFile(filePath, xls, function (err) {
                if (err) {
                    return res.json(err).status(500);
                }
                else {
                    console.log(filePath)
                    /*setTimeout(function () {
                        fs.unlinkSync(filePath); // delete this file after 30 seconds
                    }, 30000)*/
                    return res.status(200).json({ success: true, data: events })
                }
            });
        }
    })
}

module.exports = {
    createEvent,
    createTable,
    getTables,
    updateEvent,
    deleteEvent,
    getEvents,
    getEventById,
    updateEventByFile,
    getCSV,
    getXLS,
}
