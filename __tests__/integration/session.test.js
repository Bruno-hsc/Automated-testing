const request = require('supertest')
const nodemailer = require('nodemailer')

const app = require('../../src/app')
const truncate = require('../utils/truncate')
const factory = require('../factories')

jest.mock('nodemailer')

const transport = {
  sendMail: jest.fn()
}

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  beforeAll(() => {
    nodemailer.createTransport.mockReturnValue(transport)
  })

  it('should be able to authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      })

    expect(response.status).toBe(200)
  })

  it('Should not be able to authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(401)
  })

  it('Should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      })

    expect(response.body).toHaveProperty('token')
  })

  it('Should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User')

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`)

    expect(response.status).toBe(200)
  })

  it('Should not be able to access private routes when not authenticate', async () => {
    const response = await request(app).get('/dashboard')

    expect(response.status).toBe(401)
  })

  it('Should not be able to access private routes when not authenticate', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', 'Bearer 123123')

    expect(response.status).toBe(401)
  })

  it('Should receive an email notification when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      })

    expect(transport.sendMail).toHaveBeenCalledTimes(1)
    expect(transport.sendMail.mock.calls[0][0].to).toBe(
      `${user.name}<${user.email}>`
    )
  })
})
