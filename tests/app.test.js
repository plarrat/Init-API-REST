const app = require("./../app")
const request = require("supertest")
const userModel = require("./../schemas/users")

describe("Je test les endpoints de base",()=>{
    test("should return 200 for the endpoint (/)", async ()=>{
        const res = await request(app).get("/")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("<h1>Bienvenue</h1>")
        expect(res.headers["content-type"]).toBe("text/html")
    })

    test("should return 200 for the endpoint (/page)", async ()=>{
        const res = await request(app).get("/page")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("<h1>Bienvenue sur la page d'accueil</h1>")
        expect(res.headers["content-type"]).toBe("text/html")
    })
})

describe("Test endpoint (/page/:numPage)", ()=>{
    it("should return page d'accueil for param numPage missing",async ()=>{
        const res = await request(app).get("/page/")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("<h1>Bienvenue sur la page d'accueil</h1>")
    })

    it("should return 200 and numParam in return",async ()=>{
        const res = await request(app).get("/page/10")
        expect(res.statusCode).toBe(200)
        expect(res.text).toEqual("<h1>Bienvenue Nodemon npm start sur la page numero : 10</h1>")
    })
})

describe("test users endpoints", ()=>{
    let idUser ="";
    it("should create user in database", async ()=>{
        const myForm = {
            nom:"test",
            prenom:"test",
            age:999,
            notes:[],
            category:"61bb66ddbeffb61a0450711d"
        }
        const res = await request(app).post("/user").send(myForm)
        expect(res.statusCode).toBe(201)
        expect(res.body).not.toBeUndefined()
        expect(res.body.id).not.toBeUndefined()
        idUser = res.body.id;

        const user = await userModel.findById(idUser);
        expect(user.nom).toEqual("test")
        expect(user.prenom).toEqual("test")
        expect(user.age).toEqual(999)
        expect(user.category).toBeDefined()

        await userModel.deleteMany({nom:"test"})
    })
})
