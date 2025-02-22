const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  ID: String,
  data: {
    T_ACT_ENG: Number,
    I_ACT_ENG: Number,
    E_ACT_ENG: Number,
    T_REC_ENG: Number,
    I_REC_ENG: Number,
    E_REC_ENG: Number,
    APP_ENG: Number,
    ACT_PWR: Number,
    REC_PWR: Number,
    APP_PWR: Number,
    V1: Number,
    R1: Number,
    PF: Number,
    FRQ: Number,
    MD_ACT_PW: Number,
    MD_REC_PW: Number,
    MD_APP_PW: Number,
    DI1: Number,
    DI2: Number,
    AI1: Number,
    AI2: Number
  },
  TS: Date,
  DT: String
}, { collection: 'e2m2_data' }); // Specify the collection name here

const DataModel = mongoose.model('DataModel', dataSchema);
module.exports = DataModel;
