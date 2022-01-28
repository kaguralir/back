import { connection } from "../src/repository/connection";


import request from 'supertest'
import { server } from "../server";

describe('Example', () => {

    beforeEach(async () => {
        await connection.query('START TRANSACTION')
    })

    afterEach(async () => {
        await connection.query('ROLLBACK')

    })

    it("returns a 201 on successful signup", async () => {
        await request(server)
            .post('/api/user/register')
            .send({
                email: "test@test.com",
                password: "password",
                file: ["exemple", "exemple"],
                pdf: "JVBERi0xLjMKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjggODQxLjg5XQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDI1OT4+CnN0cmVhbQowLjU3IHcKMCBHCkJUCi9GMSAxNiBUZgoxOC40IFRMCjAgZwoxNDEuNzMgODEzLjU0IFRkCihGaXJzdCBOYW1lOiB1dHNhdkxhc3QgTmFtZTogTWFuaXlhcikgVGoKRVQKQlQKL0YxIDE2IFRmCjE4LjQgVEwKMCBnCjE0MS43MyA3ODUuMjAgVGQKKEZpcnN0IE5hbWU6IGhldGFMYXN0IE5hbWU6IHlhZGF2KSBUagpFVApCVAovRjEgMTYgVGYKMTguNCBUTAowIGcKMTQxLjczIDc1Ni44NSBUZAooRmlyc3QgTmFtZTogcnVuTGFzdCBOYW1lOiBydW4pIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKNSAwIG9iago8PC9CYXNlRm9udC9IZWx2ZXRpY2EvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKNiAwIG9iago8PC9CYXNlRm9udC9IZWx2ZXRpY2EtQm9sZC9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iago3IDAgb2JqCjw8L0Jhc2VGb250L0hlbHZldGljYS1PYmxpcXVlL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjggMCBvYmoKPDwvQmFzZUZvbnQvSGVsdmV0aWNhLUJvbGRPYmxpcXVlL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjkgMCBvYmoKPDwvQmFzZUZvbnQvQ291cmllci9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iagoxMCAwIG9iago8PC9CYXNlRm9udC9Db3VyaWVyLUJvbGQvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTEgMCBvYmoKPDwvQmFzZUZvbnQvQ291cmllci1PYmxpcXVlL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjEyIDAgb2JqCjw8L0Jhc2VGb250L0NvdXJpZXItQm9sZE9ibGlxdWUvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTMgMCBvYmoKPDwvQmFzZUZvbnQvVGltZXMtUm9tYW4vVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTQgMCBvYmoKPDwvQmFzZUZvbnQvVGltZXMtQm9sZC9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iagoxNSAwIG9iago8PC9CYXNlRm9udC9UaW1lcy1JdGFsaWMvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTYgMCBvYmoKPDwvQmFzZUZvbnQvVGltZXMtQm9sZEl0YWxpYy9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iagoxNyAwIG9iago8PC9CYXNlRm9udC9aYXBmRGluZ2JhdHMvVHlwZS9Gb250Ci9FbmNvZGluZy9TdGFuZGFyZEVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldCi9Gb250IDw8Ci9GMSA1IDAgUgovRjIgNiAwIFIKL0YzIDcgMCBSCi9GNCA4IDAgUgovRjUgOSAwIFIKL0Y2IDEwIDAgUgovRjcgMTEgMCBSCi9GOCAxMiAwIFIKL0Y5IDEzIDAgUgovRjEwIDE0IDAgUgovRjExIDE1IDAgUgovRjEyIDE2IDAgUgovRjEzIDE3IDAgUgo+PgovWE9iamVjdCA8PAo+Pgo+PgplbmRvYmoKMTggMCBvYmoKPDwKL1Byb2R1Y2VyIChqc1BERiAxLngtbWFzdGVyKQovQ3JlYXRpb25EYXRlIChEOjIwMjIwMTE3MTgzODI0KzAxJzAwJykKPj4KZW5kb2JqCjE5IDAgb2JqCjw8Ci9UeXBlIC9DYXRhbG9nCi9QYWdlcyAxIDAgUgovT3BlbkFjdGlvbiBbMyAwIFIgL0ZpdEggbnVsbF0KL1BhZ2VMYXlvdXQgL09uZUNvbHVtbgo+PgplbmRvYmoKeHJlZgowIDIwCjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDQyNiAwMDAwMCBuIAowMDAwMDAxNzIwIDAwMDAwIG4gCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDExOCAwMDAwMCBuIAowMDAwMDAwNDgzIDAwMDAwIG4gCjAwMDAwMDA1NzMgMDAwMDAgbiAKMDAwMDAwMDY2OCAwMDAwMCBuIAowMDAwMDAwNzY2IDAwMDAwIG4gCjAwMDAwMDA4NjggMDAwMDAgbiAKMDAwMDAwMDk1NiAwMDAwMCBuIAowMDAwMDAxMDUwIDAwMDAwIG4gCjAwMDAwMDExNDcgMDAwMDAgbiAKMDAwMDAwMTI0OCAwMDAwMCBuIAowMDAwMDAxMzQxIDAwMDAwIG4gCjAwMDAwMDE0MzMgMDAwMDAgbiAKMDAwMDAwMTUyNyAwMDAwMCBuIAowMDAwMDAxNjI1IDAwMDAwIG4gCjAwMDAwMDE5NTYgMDAwMDAgbiAKMDAwMDAwMjA0NyAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDIwCi9Sb290IDE5IDAgUgovSW5mbyAxOCAwIFIKPj4Kc3RhcnR4cmVmCjIxNTEKJSVFT0Y=",

            })
            .expect(201);
    });


    /* it('Register user, login and access protected route', async () => {
        await request(server)
            .post('/api/user/register')
            .send({

                email: 'improbableemail@mail.com',
                password: '1234'
            }).expect(201);


        const loginResponse = await request(server)
            .post('/api/user/login')
            .send({
                email: 'improbableemail@mail.com',
                password: '1234'
            }).expect(200);
        const token = loginResponse.body.token;
        expect(token).toBeDefined();

        await request(server)
            .get('/api/user/account')
            .set('authorization', 'bearer ' + token)
            .expect(200);
    }) */
})
