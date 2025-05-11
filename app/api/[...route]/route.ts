// app/api/init/route.ts
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/vercel'
import {auth} from '@/lib/auth/auth'
import { findUserByEmail } from '../database/crud'


export const runtime = 'nodejs' // Next.js App Router


const app = new Hono().basePath('/api')

app.use('/*', cors())

app.get('/hello', async (c) => {
  const start = performance.now()
  const query = c.req.query('q')
  const greeting = query
    ? `Hello ${query} from Cloudflare workers!`
    : 'Hello from Cloudflare workers!'
  const duration = performance.now() - start

  return c.json({
    message: `${greeting} (${duration.toFixed(4)} ms)`,
  })
})

//auth start
app.get('/get-user', async (c) => {
  const email = c.req.query('email') || '';
  const data = await findUserByEmail(email);
  if(data){
    return c.json({email: data[0].email, name: data[0].name}, 200)
  }
  return c.json({email: '', name: ''}, 404);
});
app.all('/auth/**', async (c) => {
  const res = await auth.handler(c.req.raw);
  return new Response(res.body, res);
});
//auth end



// Required for Next.js App Router
export const GET = handle(app)
export const POST = handle(app)
// export default app as never
