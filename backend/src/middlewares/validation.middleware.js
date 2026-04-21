 const {z} = require('zod');
 
 // signup
 const signupSchema = z.object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(6)
 });

 // signin
 const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
 });

//task
const todoSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['todo', 'in-progress', 'done'])
});

function validate(schema) {
    return async (req, res, next) => {
       
        const resaults = schema.safeParse(req.body);
        if(!resaults.success) next(resaults.error);
        req.validated = resaults.data;
        next();
    };
};

module.exports = {
    signupSchema,
    signinSchema,
    todoSchema,
    validate
};