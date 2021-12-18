import addPlayerRegister from '../controllers/playerRegistration'
import AddRetailer from '../controllers/addRetailer'
import { RouteType } from '../types/shared'

const routes: Array<RouteType> = [
  {
    path: '/customer/add-area',
    controller: AddRetailer,
  },
  {
    path: '/retailer/register',
    controller: addPlayerRegister,
  },
]

export default routes
