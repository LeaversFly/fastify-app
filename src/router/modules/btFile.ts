import type { router_DTYPE } from '#/router/modules'
import { BtFile } from '@/model/btFile'
import { mysql } from '@/utils'

export const btFile: router_DTYPE = [
    {
        // 全局代理操作对象
        isProxy: true,
        prefix: '/file',
        swagger: {
            tags: ['btFile'],
        },
    },
    {
        url: '/findAll',
        method: 'GET',
        swagger: {
            summary: '查询所有数据',
            description: '查询所有数据description!',
        },
        handler: async (_req, rep) => {
            const data = await mysql.call('select * from bt_file')
            rep.send(data)
        },
    },
    {
        url: '/:id',
        method: 'GET',
        swagger: {
            summary: '根据ID查询单个数据',
            description: '根据ID查询单个数据description!',
        },
        schema: {
            querystring: {
                id: { type: 'number' }
            }
        },
        handler: async (req, rep) => {
            const { id } = req.params as BtFile
            const res = await mysql.call(`select * from bt_file where id = ${id}`)
            rep.send(res)
        },
    }
]