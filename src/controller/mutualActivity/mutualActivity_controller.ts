import { Router } from "express";

import bcrypt from 'bcrypt';
import passport from "passport";
import { candidatActivity_repository } from "../../repository/mutualActivity/candidatActivity_repository";


export const MutualActivity = Router();

MutualActivity.get('/mutualThumbsUp', async (req, res) => {
    try {
        const post = await candidatActivity_repository.getMutualThumbsUp();

        return res.status(200).json({
            success: true,
            count: post.length,
            data: post
        });
    } catch (err) {
        console.log("err mutual thumb is",err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});