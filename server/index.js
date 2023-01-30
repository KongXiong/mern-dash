import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'

// data imports
import {
  dataAffiliateStat,
  dataOverallStat,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataUser,
} from './data/index.js'
import AffiliateStat from './models/AffiliateStat.js'
import OverallStat from './models/OverallStat.js'
import Product from './models/Product.js'
import ProductStat from './models/ProductStat.js'
import Transaction from './models/Transaction.js'
import User from './models/User.js'

// configs
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// routes
app.use('/client', clientRoutes)
app.use('/general', generalRoutes)
app.use('/management', managementRoutes)
app.use('/sales', salesRoutes)

// mongoose
const PORT = process.env.PORT || 9000
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

    // Only add data once
    // User.insertMany(dataUser)
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction)
    // OverallStat.insertMany(dataOverallStat)
    // AffiliateStat.insertMany(dataAffiliateStat)
  })
  .catch((error) => console.log(`${error} did not connect`))
