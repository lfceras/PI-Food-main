require('dotenv').config()
const { expect } = require('chai')
const session = require('supertest-session')
const app = require('../../src/app.js')
const { Recipe, conn } = require('../../src/db.js')
const { v4: uuidv4 } = require('uuid')
const {
  recipe,
  incompleteRecipe,
  newRecipe,
  updateRecipe
} = require('../../src/helpers-test')

const agent = session(app)

const token = process.env.JWT_TOKEN

describe('Recipe routes', () => {
  // se ejecuta una vez antes de la primera prueba en este bloque --> con el before
  beforeEach(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err)
    })
  )

  // se ejecuta una vez después de la última prueba en este bloque --> con el beforeEach
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  )
})

// codiumai

let recipeId

// CREATE RECIPE TEST ROUTING
describe('POST /recipes', () => {
  beforeEach(async () => {
    await Recipe.destroy({ where: {} }) // Eliminar todas las recetas existentes en la base de datos
  })

  it('should respond with status code 400 if the recipe data is incomplete', async () => {
    const response = await agent
      .post('/recipes')
      .set('x-access-token', token)
      .send(incompleteRecipe)
    expect('Content-Type', /json/)
    expect(response.statusCode).to.equal(400)
  })

  it('should respond with status code 401 if no token is provided', async () => {
    const response = await agent
      .post('/recipes')
      .send(newRecipe)
      .set('x-access-token', '')
    expect('Content-Type', /json/)
    expect(response.statusCode).to.equal(401)
  })

  it('should respond with status code 400 if an invalid token is provided', async () => {
    const response = await agent
      .post('/recipes')
      .set('x-access-token', 'invalid-token')
      .send(newRecipe)
    expect('Content-Type', /json/)
    expect(response.statusCode).to.equal(403)
  })

  it('should respond with status code 400 if the recipe exists', async () => {
    await Recipe.create({
      name: `Milanesa a la napolitana${Date.now()}`,
      image: 'image-url.jpg',
      summary:
        'Vietnamese Pancakes with Vegetables, Herbs and a Fragrant Dipping Sauce (Bánh Xèo) requires roughly 45 minutes from start to finish.'
    })
    const response = await agent
      .post('/recipes')
      .set('x-access-token', token)
      .send({ name: 'Milanesa' })
    expect('Content-Type', /json/)
    expect(response.statusCode).to.equal(400)
  })

  it('should create a new recipe', async () => {
    const response = await agent
      .post('/recipes')
      .set('x-access-token', token)
      .send(newRecipe)
    expect(response.statusCode).to.equal(201)
    expect(response.body.data.recipeCreated).to.have.property('id')
    expect(response.body.data.recipeCreated.name).to.equal(newRecipe.name)
    recipeId = response.body.data.recipeCreated.id
  })
})

// GET RECIPES TEST ROUTING
describe('GET /recipes', () => {
  it('should get 200', async () => {
    const response = await agent.get('/recipes').set('x-access-token', token)
    expect('Content-Type', /json/)
    expect(response.statusCode).to.equal(200)
  })

  it('should return JSON', async () => {
    const response = await agent.get('/recipes').set('x-access-token', token)
    expect(response.headers['content-type']).to.include('application/json')
  })

  it('should return an array', async () => {
    const response = await agent.get('/recipes').set('x-access-token', token)
    expect('Content-Type', /json/)
    expect(response.body.data).to.be.an('array')
  })

  it('should return an array of objects', async () => {
    const response = await agent.get('/recipes').set('x-access-token', token)
    expect('Content-Type', /json/)
    expect(response.body.data).to.be.an('array')
    response.body.data.forEach((item) => {
      expect(item).to.be.an('object')
    })
  })

  it('should return an array of objects with specific properties', async () => {
    const response = await agent.get('/recipes').set('x-access-token', token)
    expect('Content-Type', /json/)
    expect(response.body.data).to.be.an('array')
    response.body.data.forEach((item) => {
      expect(item).to.be.an('object')
      expect(item).to.have.property('id')
      expect(item).to.have.property('name')
      expect(item).to.have.property('summary')
    })
  })
})

// GET BY ID TEST ROUTING
describe('GET /recipes/:id', () => {
  it('should get a recipe by id', async () => {
    const idRecipe = 715421
    const response = await agent.get(`/recipes/${recipeId}`)
    expect(response.statusCode).to.equal(200)
    expect('Content-Type', /json/)
  })

  it('should respond with status code 404 when the recipe does not exits', async () => {
    const nonExistingId = 99999
    const response = await agent.get(`/recipes/${nonExistingId}`)
    expect('Content-Type', /json/)
    expect(response.statusCode).to.equal(404)
  })

  it('should respond with status code 400 when the id is not a number', async () => {
    const nonNumeric = 'abc'
    const response = await agent.get(`/recipes/${nonNumeric}`)
    expect('Content-Type', /json/)
    expect(response.statusCode).to.equal(400)
  })

  it('should respond with status code 404 when the id is a floating point number', async () => {
    const floatingPoint = 12.34
    const response = await agent.get(`/recipes/${floatingPoint}`)
    expect('Content-Type', /json/)
    expect(response.statusCode).to.equal(404)
  })
})

// UPDATE TEST ROUTING
describe('PUT /recipes/:id', () => {
  it('should respond with statuscode 404 if not found recipe', async () => {
    const notExistingRecipe = uuidv4()
    const response = await agent
      .patch(`/recipes/${notExistingRecipe}`)
      .set('x-access-token', token)
    expect('Content-Type', /json/)
    expect(response.statusCode).to.equal(404)
  })

  it('should respond with status code 400 if the id does not valid', async () => {
    const nonValidId = 'kjhsdflkjasgf'
    const respond = await agent
      .patch(`/recipes/${nonValidId}`)
      .set('x-access-token', token)
    expect(respond.statusCode).to.equal(400)
  })

  it('should respond with status code 401 if no token provided', async () => {
    const response = await agent
      .patch(`/recipes/${recipeId}`)
      .set('x-access-token', '')
    expect(response.statusCode).to.equal(401)
  })

  it('should respond with status code 400 if the recipe object is empty', async () => {
    const emptyRecipe = {}
    const response = await agent
      .patch(`/recipes/${recipeId}`)
      .set('x-access-token', token)
      .send(emptyRecipe)
    expect('Content-Type', /json/)
    expect(response.statusCode).to.equal(400)
  })

  it('should update a recipe', async () => {
    const respond = await agent
      .patch(`/recipes/${recipeId}`)
      .set('x-access-token', token)
      .send(updateRecipe)
    expect('Content-Type', /json/)
    expect(respond.statusCode).to.equal(200)
  })
})

// DELETE TEST ROUTING
describe('DELETE /recipes/:id', () => {
  it('should respond with status code 401 if not authenticated', async () => {
    const response = await agent.delete(`/recipes/${recipeId}`)
    expect('Content-Type', /json/)
    expect(response.statusCode).to.equal(401)
  })

  it('should respond with status code 403 if user is not authorized', async () => {
    const nonAuthorizedUserToken = 'non_authorized_token'
    const response = await agent
      .delete(`/recipes/${recipeId}`)
      .set('x-access-token', nonAuthorizedUserToken)
    expect('Content-Type', /json/)
    expect(response.statusCode).to.equal(403)
  })

  it('should respond with status code 400 if the id does not valid', async () => {
    const nonValidId = 'kjhsdflkjasgf'
    const respond = await agent
      .delete(`/recipes/${nonValidId}`)
      .set('x-access-token', token)
    expect(respond.statusCode).to.equal(400)
  })

  it('should respond with status code 404 if not found recipe', async () => {
    const nonExistingRecipe = uuidv4()
    const response = await agent
      .delete(`/recipes/${nonExistingRecipe}`)
      .set('x-access-token', token)
    expect('Content-Type', /json/)
    expect(response.statusCode).to.equal(404)
  })

  it('should delete a recipe', async () => {
    const response = await agent
      .delete(`/recipes/${recipeId}`)
      .set('x-access-token', token)
    expect('Content-Type', /json/)
    expect(response.statusCode).to.equal(200)
  })
})
