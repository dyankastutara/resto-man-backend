const mongoose = require('mongoose');
const mongoDB = 'mongodb://restman:restman@ds147882.mlab.com:47882/report_rest_name'


mongoose.connect(mongoDB)

mongoose.connection.on('connected', ()=>{
  console.log('Database connected to '+mongoDB)
})

mongoose.connection.on('error', (err)=>{
  console.log('Database connect '+err)
})

mongoose.connection.on('disconnected', ()=>{
  console.log('Database disconnected : '+mongoDB)
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
