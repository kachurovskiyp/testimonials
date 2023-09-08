const server = require('../../../server.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert = require('../../../models/concerts.model.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
        const testConOne = new Concert({
            performer: 'performer1',
            genre: 'genre1',
            price: 20,
            day: 1,
            image: 'image'
        });
        await testConOne.save();

        const testConTwo = new Concert({
            performer: 'performer2',
            genre: 'genre2',
            price: 30,
            day: 2,
            image: 'image'
        });
        await testConTwo.save();
    });

    after(async () => {
        await Concert.deleteMany();
    });

    it('/ should return all concerts', async () => {
        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });
});