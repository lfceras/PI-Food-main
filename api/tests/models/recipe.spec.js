const { Recipe, conn } = require('../../src/db.js')
const { expect } = require('chai')

describe('Recipe model', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err)
    })
  )
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }))
   
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({}) 
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done())
      })
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' })
      }) 
    }) 
 
    describe('image', () => {
      it('should throw an error if image is null', (done) => {
        Recipe.create({ name: 'Milanesa a la napolitana', image: null })
          .then(() => done(new Error('It requires a valid image')))
          .catch(() => done())
      })

      it('should work when it is a valid image', () => {
        Recipe.create({
          name: 'Milanesa a la napolitana',
          image: 'image-url.jpg'
        })
      })
    })

    describe('summary', () => {
      it('should throw an error if the summary is null', (done) => {
        Recipe.create({ name: 'Milanesa a la napolitana', summary: null })
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done())
      })

      it('should work when it is a valid summary', () => {
        Recipe.create({
          name: 'Milanesa a la napolitana',
          image: 'image-url.jpg',
          summary:
            'Vietnamese Pancakes with Vegetables, Herbs and a Fragrant Dipping Sauce (Bánh Xèo) requires roughly 45 minutes from start to finish.'
        })
      })
    })
  })
})
