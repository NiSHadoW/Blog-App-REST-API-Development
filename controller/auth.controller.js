import { registerUser, loginUser } from "../services/auth.services.js";

export const signUp = async(req,res)=>{
    const {firstname, lastname, email, password} = req.body;
    try{
        const user = await registerUser({firstname, lastname, email, password});
        res.status(201).json({
            message: "User created successfully",
            data: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: "user",
                "isActive": true
            }
        })
    }
    catch(error)
    {
        res.status(error.statusCode || 500).json({
            message: error.message || "Server error!"
        })
    }
}

export const login = async(req, res)=>{
    const {email, password} = req.body;
    try{
        const {token, user} = await loginUser({email,password});
        res.status(200).json({
            message: "Login successful!",
            data: {
                token, user: {
                    id:user.id,
                    email: user.email,
                    role: user.role,
                    isActive: user.isActive
                }
            }
        })
    }
    catch(error)
    {
        res.status(error.statusCode || 500).json({
            message: error.message || "Server error"
        });
    }
}