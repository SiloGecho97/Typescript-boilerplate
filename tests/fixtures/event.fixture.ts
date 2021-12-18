import mongoose from 'mongoose'

const AddRetailerOne = {
  _id: new mongoose.Types.ObjectId(),
  eventName: 'AreaRegistration',
  eventTime: new Date(),
  areaId: new mongoose.Types.ObjectId(),
  name: 'xotto-area-1',
}

export default {
  AddRetailerOne,
}
