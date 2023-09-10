import { fastify, logger } from './utils'
import intercept from '@/common/intercept'
import throws from '@/common/throw'
import plugin from '@/plugin'
import router from '@/router'
import { listenConfig } from './config'

async function startServer() {
    intercept() // 注册拦截器
    throws() // 注册异常处理
    router() // 注册路由
    await plugin() // 注册插件

    // 启动服务 nodemon
    fastify.listen({ port: listenConfig.port, host: listenConfig.ip }, (err) => {
        if (err) {
            logger.error(`server start error = ${err.message}`)
            throw err
        }
        // logger.info(`路由树形结构:\n ${fastify.printRoutes()}`)
    })
}

startServer()