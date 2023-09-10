import type { router_DTYPE } from '#/router/modules'

export const testInfo: router_DTYPE = [
    {
        // 全局代理操作对象
        isProxy: true,
        prefix: '/testInfo',
        limit: [10, 5], // 10秒/5次 访问限制
        swagger: {
            tags: ['testInfo'],
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
            rep.send('/findAll')
        },
    },
    {
        url: '/findOne',
        method: 'GET',
        swagger: {
            summary: '根据ID查询单个数据',
            description: '根据ID查询单个数据description!',
        },
        handler: async (req, rep) => {
            rep.send('/findOne')
        },
    }
]