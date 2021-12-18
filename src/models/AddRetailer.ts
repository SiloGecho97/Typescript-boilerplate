import mongoose, { Schema } from 'mongoose'
import { AddRetailer } from '../types/models/events'

const AddRetailerSchema: Schema = new Schema<AddRetailer>(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventTime: {
      type: Date,
      required: true,
      default: new Date(),
    },
    areaId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    written: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: false },
)

const AddRetailerModel = mongoose.model<AddRetailer>(
  'AddRetailer',
  AddRetailerSchema,
)

export default AddRetailerModel
