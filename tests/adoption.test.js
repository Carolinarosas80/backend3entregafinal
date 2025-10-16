import chai from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import app from '../src/app.js';
import Adoption from '../src/models/Adoption.js';
const expect = chai.expect;
describe('Adoption Router - funcional (ESM)', function() {
  this.timeout(20000);
  before(async () => {
    const envPath = path.resolve(process.cwd(), '.env.test');
    if (fs.existsSync(envPath)) {
      const env = fs.readFileSync(envPath, 'utf-8').split('\n').filter(Boolean);
      env.forEach(line => { const [k,v] = line.split('='); if(k && v) process.env[k.trim()] = v.trim(); });
    }
    process.env.NODE_ENV = 'test';
    const dbName = process.env.TEST_DB_NAME || process.env.DB_NAME || 'adoptme_test';
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${dbName}?retryWrites=true&w=majority`;
    await mongoose.connect(uri);
    await Adoption.deleteMany({});
  });
  after(async () => { await mongoose.connection.dropDatabase(); await mongoose.connection.close(); });
  it('GET /adoptions => array', async () => { const res = await request(app).get('/adoptions'); expect(res.status).to.equal(200); expect(res.body).to.be.an('array'); });
  it('POST /adoptions => 400 if missing pet', async () => { const res = await request(app).post('/adoptions').send({ type: 'Dog' }); expect(res.status).to.equal(400); expect(res.body).to.have.property('error'); });
  it('POST /adoptions => creates', async () => { const newAdoption = { pet: 'Fido', type: 'Dog', adopter: 'Juan' }; const res = await request(app).post('/adoptions').send(newAdoption); expect(res.status).to.equal(201); expect(res.body).to.have.property('_id'); expect(res.body.pet).to.equal('Fido'); });
  it('GET /adoptions/:id => 404 for invalid id', async () => { const res = await request(app).get('/adoptions/000000000000000000000000'); expect(res.status).to.equal(404); });
  it('GET /adoptions/:id => returns item', async () => { const saved = await new Adoption({ pet: 'Luna', type: 'Cat' }).save(); const res = await request(app).get(`/adoptions/${saved._id}`); expect(res.status).to.equal(200); expect(res.body.pet).to.equal('Luna'); });
  it('DELETE /adoptions/:id => deletes item', async () => { const toDelete = await new Adoption({ pet: 'Bobby' }).save(); const res = await request(app).delete(`/adoptions/${toDelete._id}`); expect(res.status).to.equal(200); expect(res.body).to.have.property('ok', true); });
});
