import express from 'express'
const router=express.Router()

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body

        if(!email || !password)
            return res.status(400).json({message:'Email & password are required'})
        
        return res.status(200).json({ message: 'Login route working!' });
    }catch(error){
      console.error('Error in /login:', error);
      res.status(500).json({ message: 'Server error' });
    }
})

export default router