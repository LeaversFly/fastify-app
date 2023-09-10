import type { RouteOptions } from 'fastify'
import type { firstRouter_DTYPE, arrayRouter_DTYPE } from '#/router/modules'

import fs from 'node:fs'

import { fastify, logger } from '@/utils'

const path = './src/router/modules'
export default () => {
    const router: Array<any> = []

    const fileNames = fs.readdirSync(path)

    fileNames.forEach(async (item, index) => {
        let res = await import(`./modules/${item}`)
        router.push(res[`${item.split('.')[0]}`])

        // 遍历至最后一个元素，开始挂载路由
        if (index === fileNames.length - 1) {
            router.forEach((info) => { // 循环子模块路由配置 生产路由
                const first = info[0] as Partial<firstRouter_DTYPE>
                const filter = first?.isProxy ? Object.keys(first).filter((f) => f !== 'isProxy') : []

                // 代理和默认值设定
                info.slice(1).map((module: arrayRouter_DTYPE) => {
                    if (first.isProxy) {
                        filter.forEach((key) => {
                            if (key === 'swagger' && first.swagger) {
                                module.schema = Object.assign(module.schema || {}, first.swagger)
                            } else if (key === 'prefix' && first.prefix) {
                                module.url = first.prefix + module.url
                            } else {
                                module[key] = typeof first[key] !== 'undefined' ? first[key] : module[key]
                            }
                        })
                    }
                    // console.log('%c [ module ]-32', 'font-size:14px; background:#41b883; color:#ffffff;', JSON.stringify(module))
                    if (module.skip) {
                        delete module.skip
                    }
                    if (module.swagger) {
                        module.schema = Object.assign(module.schema || {}, module.swagger)
                        delete module.swagger
                    }
                    fastify.route(module as RouteOptions)
                })
            })
        }
    })

    logger.start('use router!')
}
