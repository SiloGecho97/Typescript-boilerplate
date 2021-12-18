import { Document } from 'mongoose'

export interface AddRetailer extends Document {
  eventName: string
  eventTime: Date
  areaId: string
  name: string
  written: boolean
}

export interface PlayerRegister {
  eventName: string
  eventTime: Date
  playerId: string
  username?: string
  fullName: string
  postCode: string
  place: string
  area: string
  country: string
  citizenship: string
  street: string
  number: number
  brithDate: string
  brithLocation: string
  brithName: string
  automaticProfitTransactionmoneyAmount?: number
  written: boolean
}

export interface PlayerRegisterDocument extends PlayerRegister, Document {}
