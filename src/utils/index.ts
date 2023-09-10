import Fastify from 'fastify'
import { Logger } from './log'
import { isDev } from '@/config'
import { MysqlExecute } from '@/db/mysql'

const loggerConfig = {
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid',
        },
    }
}

// fastify实例对象
export const fastify = Fastify({
    logger: isDev ? loggerConfig : {},
    bodyLimit: 524288,
    requestTimeout: 3000,
})

// pino日志
export const logger = new Logger(fastify.log)

// mysql执行器实例对象
export const mysql = new MysqlExecute()