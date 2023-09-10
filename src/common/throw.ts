import { fastify, logger } from '@/utils'

export default () => {
    logger.start('use throw error!')

    fastify.setErrorHandler((error, _req, res) => {
        // error.validationContext 是 [body, params, querystring, headers] 之中的值
        if (error.validation) {
            const msg = Array.from(error.validation, ({ message }) => message).join(',')
            const str = `validation failed of the ${error.validationContext}! ${msg}`
            logger.info(`verify = ${str}`)
            res.status(400).send(str)
        } else {
            logger.info(`error = ${error}`)
            res.status(400).send(error)
        }
    })
}
