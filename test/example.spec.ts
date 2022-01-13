import supertest from "supertest";
import { server } from './../server';

describe('Example', () => {
    it('should start the server and not much else', () => {
        const response = supertest(server).get('/').expect(404);
    })
})
