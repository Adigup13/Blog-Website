import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { updateblogInput } from "blogwonders-common";
import { createblogInput } from "blogwonders-common";



export const blogRouter = new Hono<{
    Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
},   
     Variables: {
      userId: string;
     }

}>(); 
blogRouter.use("/*", async(c,next)=>{
    const authHeader = c.req.header("authorization")|| "";
     const user= await verify(authHeader, c.env.JWT_SECRET );
      if(user){
       //@ts-ignore 
      c.set("userId", user.id);
     await next();
 } else {
  c.status(403);
  return c.json({
    message: "you are not logged in"
  })
 }
})

blogRouter.post('/' , async(c)=>{
     const body = await c.req.json();
     const {success} = createblogInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "input not correct"
      })
    }
     const authorId = c.get("userId");
     const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate()) 

      
          const blog = await prisma.blogs .create({
            data: {
              title: body.title,
              content: body.content,
              authorId: Number(authorId)
            }
          })

      return c.json({
        id: blog.id
      })
   })
  
   blogRouter.put('/', async(c)=>{
    const body = await c.req.json();
    const {success} = updateblogInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "input not correct"
      })
    }
    const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate()) 

     
         const blog = await prisma.blogs.update({
          where: {
            id: body.id
          },
           data: {
             title: body.title,
             content: body.content,
          
           }
         })

     return c.json({
       id: blog.id
     })
   })
  
   blogRouter.get('/bulk', async (c)=> {
    
    const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate()) 
     
     const blog = await prisma.blogs.findMany({
       select: {
        content: true,
        title: true,
        id: true,
        author: {
          select:{
            name:true
          }
        }
       }
     });
    
    return c.json({
        blog
    })
  
  })

   blogRouter.get('/:id', async(c)=>{
    const id = await c.req.param("id");
    const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate()) 

     try {
      const blog = await prisma.blogs.findFirst({
        where: {
          id: Number(id)
        } 
       })

   return c.json({
     id: blog  
   })
     } catch (e) {
      c.status(403);
      c.json({
        message: "internal issue"
      })
      
     }
        
   })
 


 