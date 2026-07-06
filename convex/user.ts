// import { v } from "convex/values";
// import { mutation } from "./_generated/server";

// export const CreateNewUser = mutation({
//     args: {
//         name: v.string(),
//         email: v.string(),
//         imageUrl: v.string()
//     }, 
    
//     handler: async (ctx, args) => {
//         // If User already exists
//         const user = await ctx.db
//         .query('UserTable')
//         .filter((q) => q.eq(q.field('email'), args.email))
//         .collect()

//         if(user?.length === 0){
//             const userData = {
//                 name: args.name,
//                 email: args.email,
//                 imageUrl: args.imageUrl
//             }

//             // If Not, then create New User
//             const result = await ctx.db.insert('UserTable', userData)
//             return userData
//             // return result
//         }

//         return user[0]
//     }
// })

import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },

  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("UserTable")
      .filter((query) => query.eq(query.field("email"), args.email))
      .first();

    if (existingUser) {
      return existingUser;
    }

    const userData = {
      name: args.name,
      email: args.email,
      imageUrl: args.imageUrl,
    };

    const id = await ctx.db.insert("UserTable", userData);

    return {
      _id: id,
      ...userData,
    };
  },
});