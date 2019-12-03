const NODE_ENV = process.env.NODE_ENV || 'dev'

const whitelist = []

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || NODE_ENV === 'dev') {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export default corsOptions
