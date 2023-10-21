const z = require('zod')

const recipeSchema = z.object({
  name: z.string({
    invalid_type_error: "name deberia ser un string",
    required_error: "name es requerido"
  })
  .trim()
  .min(5),
  image: z.string({
    required_error: "image es requerido"
  })
  .url(),
  summary: z.string({
    required_error: "summary es requerido"
  }),
  healthScore: z.number().min(0).max(100).default(50),
  steps: z.array(z.string()),
  diets: z.array(z.string()),
  cuisines: z.array(z.string()),
  dishTypes: z.array(z.string()),

})

const validateRecipe = (object)=>{
  return recipeSchema.safeParse(object)
}

const validatePartialRecipe = (object)=>{
  return recipeSchema.partial().safeParse(object)
}

module.exports = {
  validateRecipe,
  validatePartialRecipe
}