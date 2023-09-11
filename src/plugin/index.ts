import { fastify } from "@/utils";
import swagger from "./swagger";
import fastifyCors from '@fastify/cors'
import fastifyJwt from "@fastify/jwt";
import { jwtKeyConfig } from "@/config";

export default async () => {
    //jwt令牌
    await fastify.register(fastifyJwt, { secret: jwtKeyConfig })
    await fastify.register(fastifyCors)
    await swagger()
}