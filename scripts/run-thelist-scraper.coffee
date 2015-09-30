fs = require("fs")
os = require("os")
path = require("path")
mkdirp = require("mkdirp")
winston = require("winston")
request = require("request")
fibrous = require("fibrous")
cheerio = require("cheerio")

isRateLimited = (response)->
    if response.statusCode is 200
        return false
    if response.body?.match?(/Too Many Requests/)
        return true
    return false

setTimeoutSync = fibrous(()->
    setTimeout
)


class Executor
    name: null
    claimRootPath: null
    logger = null
    config = {}

    setupLogging: ()->
        winston.loggers.add('the-list', {
            console: {
              colorize: 'true',
              label: 'the-list-import'
            }
        })

    log: (string, type)->
        date = new Date()
        logString = date.toString() + "_PROCESS " + process.pid + "_winston_import.viator " + string
        if type is "error"
            @logger.error(logString)
        else
            @logger.info(logString)

    createClaimName: ()->
        startTime = new Date().toString().replace(/[ :]/g,"-").replace(/[()]/g,"")
        claimString = "the-list-claim_" + os.hostname() + "_" + startTime + "_" + "PROCESS_" + process.pid
        return claimString

    restartClaim: (claimString)->
        @claimRootPath = path.resolve(@config.rootPath, claimString)
        logFile = path.resolve(@claimRootPath, "logs/import.log")
        @logger = winston.loggers.get('the-list')
        @logger.add(winston.transports.File, { filename: logFile, level: 'info', json: false })

        @log("restarting claim: " + claimString)
        @log("running The List import, exporting to #{@config.rootPath}")
        if @config.destinationNames then @log("filtering by #{@config.destinationNames}")

    createClaim: (rootPath)->

        constructPaths = (rootPath)->
            directories = ["logs", "tmp", "shows", "meta"]
            for dir in directories
                mkdirp.sync(path.resolve(rootPath, dir))

        @name = @createClaimName()
        @claimRootPath = path.resolve(rootPath, @name)
        constructPaths(@claimRootPath)

        #logging setup
        logFile = path.resolve(@claimRootPath, "logs/import.log")
        @logger = winston.loggers.get('the-list')
        @logger.add(winston.transports.File, { filename: logFile, level: 'info', json: false })

        # first logging: we are running the import
        @log("running The List import, exporting to #{@config.rootPath}")
        if @config.destinationNames then @log("filtering by #{@config.destinationNames}")
        @log("claimString generated: " + @name)

    execute: (stageNames)=>

        @stageNames = stageNames

        if not @config.rootPath
            throw new Error("Unable to import without a designated path.")

        @setupLogging()

        if not @config.claimToRestart
            @createClaim(@config.rootPath)
        else
            @restartClaim(@config.claimToRestart) #how to manage state?

        executionStack = ()=>

            if "WHATEVER" in @stageNames or "ALL" in @stageNames
                1
                #@loadLocationsFromViator()


        fibrous.run(executionStack)




mainExport = (stages, rootPath, claimToRestart, options)->
    rootPath or= options.rootPath
    claimToRestart or= options.claimToRestart
    stages or= options.stages

    executor = new Executor()
    executor.config = {
        rootPath: rootPath,
        claimToRestart: claimToRestart
    }

    executor.execute(stages)

module.exports = mainExport

if module is require.main

    executor = new Executor()

    executor.config = {
        rootPath: process.argv[3],
        claimToRestart: process.argv[4]
    }
    #stage = process.argv[2]?.replace(/\s+/g, '').match(/\[([^\]]+)]/)[1].split(",") #ugly, but works, assumes string
    executor.execute("ALL")
