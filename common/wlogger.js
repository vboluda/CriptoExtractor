const {createLogger, format, transports } = require("winston");

const wConfig={
    level: 'debug',
    transports: [
      new  transports.Console({
        showLevel: false,
        colorize: true,
        timestamp: true
      }),
      new  transports.File({ filename:"logs/app.log" })
    ]
    // ,exceptionHandlers: [
    //   new transports.File({ filename: 'logs/exceptions.log' }),
    //   new transports.Console()
    // ]
};



module.exports=createLogger(wConfig);