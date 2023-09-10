import { fastify, logger } from '@/utils'

const ICO = '/favicon.ico'
// const H_KEY1 = 'Access-Control-Allow-Origin'
// const H_KEY2 = 'Access-Control-Allow-Headers'
// const H_KEY3 = 'Access-Control-Allow-Methods'
// const H_VAL1 = '*'
// const H_VAL2 = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
// const H_VAL3 = 'POST,GET,OPTIONS'

export default () => {
    logger.start('use request hook!')

    // 请求
    fastify.addHook('onRequest', (req, res, next) => {
        // reply.header(H_KEY1, H_VAL1)
        // reply.header(H_KEY2, H_VAL2)
        // reply.header(H_KEY3, H_VAL3)

        const { url, method } = req.raw
        if (url === ICO) {
            next()
            return
        }

        if (method === 'OPTIONS') {
            next()
            return
        }

        // 未处理
        next()
    })

    // 预处理
    // fastify.addHook('preHandler', (req, res, next) => {
    //  logger.info(`预处理 = ${{ id: req.id }}`)
    //  next()
    // })

    // 响应
    // fastify.addHook('onResponse', (res) => {
    // logger.info(`响应钩子 = ${{ id: req.id }}`)
    //  logger.info({ id: res.id },'响应拦截...')
    //  logger.info(res)
    // })
}