import mongoose, { Schema } from 'mongoose'
import { PlayerRegisterDocument } from '../types/models/events'

const playerRegisterSchema: Schema = new Schema<PlayerRegisterDocument>(
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
    playerId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: false,
    },
    fullName: {
      type: String,
      required: false,
    },
    postCode: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    citizenship: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    brithDate: {
      type: String,
      required: true,
    },
    brithLocation: {
      type: String,
      required: true,
    },
    brithName: {
      type: String,
      required: true,
    },
    automaticProfitTransactionmoneyAmount: {
      type: Number,
      required: false,
    },
    written: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: false },
)

const PlayerRegister = mongoose.model<PlayerRegisterDocument>(
  'PlayerRegister',
  playerRegisterSchema,
)

export default PlayerRegister
