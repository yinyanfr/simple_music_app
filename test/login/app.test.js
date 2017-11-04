const expect = require("expect");
const request = require("supertest");
const User = require("./user"),
      Song = require("./song"),
      Playlist = require("./playlist");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

const {app} = require("./app");

const existUser = {
    email: "i@yinyan.fr",
    password: "123456",
    pseudo: "ucec"
}

const testUser = {
    email: "i@73000.fr",
    password: "123456",
    pseudo: "ucec"
};

const fakeUser = {
    email: "not.a.email",
    pseudo: "1"
};

var tmpToken = "";

const removeTestUser = done => {
    User.findOneAndRemove({email: testUser.email})
        .then(() => done())
};

const removeTestSong = done => {
    Song.findOneAndRemove({link: songValid.link})
        .then(() => done())
}

beforeEach(removeTestUser);
beforeEach(removeTestSong);

describe("POST /register", () => {
    it("should register a new user when data is valid", (done) => {
        request(app)
            .post("/register")
            .send(testUser)
            .expect(200) // should success
            .expect(res => {
                // res should be identique as it is defined
                const {email, pseudo} = res.body.data;
                expect(email).toBe(testUser.email);
                expect(pseudo).toBe(testUser.pseudo);
                // should receive nothing more
                expect(Object.keys(res.body.data).length).toBe(2);
            })
            .end((err, res) => {
                if(err) return done(err);
                // user should be found in db
                User.find({email: testUser.email})
                    .then(users => {
                        expect(users.length).toBe(1);
                        expect(users[0].email).toBe(testUser.email);
                        done()
                    })
                    .catch(err => done(err))
            })
    });

    it("should fail to register a user when data is broken", (done) => {
        request(app)
            .post("/register")
            .send(fakeUser)
            .expect(400) // should be a bad request
            .expect(res => {
                // type of error should fit the example
                const{email, password, pseudo} = JSON.parse(res.text).errors;
                expect(email.kind).toBe("user defined");
                expect(password.kind).toBe("required");
                expect(pseudo.kind).toBe("minlength")
            })
            .end((err, res) => {
                if(err) return done(err);
                // a invalid user should NOT be added into db
                User.find({email: fakeUser.email})
                    .then(users => {
                        expect(users.length).toBe(0);
                        done();
                    })
                    .catch(err => done(err))
            })
    });
    
    it("should NOT register a existing user", done => {
        request(app)
            .post("/register")
            .send(existUser)
            .expect(400)
            .end(done)
    });
});

const songValid = {
    name: "Blue Symphony",
    artist: "Yan",
    source: "youtube",
    link: "https://www.youtube.com/watch?v=X44tEMCMHWc"
};

const existSong = {
    "name": "祈りの花",
    "artist": "Yan",
    "source": "youtube",
    "link": "https://www.youtube.com/watch?v=mn-CLAvNknA"
};

const existSid = "22faa62c-4d08-4fd9-95f8-f50efab9e6fb";

describe("POST /newsong", () => {
    it("should add a new song when info is valid", done => {
        request(app)
            .post("/newsong")
            .send(songValid)
            .expect(200)
            .expect(res => {
                const {sid, name, link} = res.body;
                expect(sid).toBeTruthy();
                expect(name).toBe(songValid.name); 
                expect(link).toBe(songValid.link);
            })
            .end((err, res) => {
                if(err) return done(err);
                Song.find({link: songValid.link})
                    .then(songs => {
                        expect(songs.length).toBe(1);
                        expect(songs[0].sid).toBeTruthy();
                        expect(songs[0].link).toBe(songValid.link);
                        done();
                    })
                    .catch(err => done(err))
            })
    });

    it("should NOT add a new song when info isn't valid", done => {
        request(app)
            .post("/newsong")
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) return done(err);
                done()
            })
    });

    it("should NOT add a song with identique [link]", done => {
        request(app)
            .post("/newsong")
            .send(existSong)
            .expect(400)
            .end((err, res) => {
                if(err) return done(err);
                done()
            })
    })
});

describe("GET /song", () => {
    it("should return return link to a sid given", done => {
        request(app)
            .get(`/song/${existSid}`)
            .expect(200)
            .expect(res => {
                expect(res.body.link).toBe(existSong.link)
            })
            .end(done)
    });

    it("should return 404 to a sid non-exist", done => {
        request(app)
            .get("/song/something_else")
            .expect(404)
            .end(done)
    })
});

describe("POST /login", () => {
    it("should return token for a existing correct user", done => {
        request(app)
            .post("/login")
            .send(existUser)
            .expect(200)
            .expect(res => {
                var token = res.headers["x-auth"];
                tmpToken = token;
                expect(token).toBeTruthy()
            })
            .end((err, res) => {
                if(err) return done(err);
                // token should be registered into db
                User.findOne({email: existUser.email})
                    .then(user => {
                        const tokens = user.toObject().tokens;
                        expect(tokens[tokens.length - 1]).toMatchObject({
                            access: "auth",
                            token: res.headers["x-auth"]
                        });
                        done()
                    })
                    .catch(err => done(err))
            })
    });

    it("should refuse a exising user without correct password", done => {
        request(app)
        .post("/login")
        .send({
            email: existUser.email,
            password: existUser.password + "not_correct"
        })
        .expect(401)
        .expect(res => {
            expect(res.headers["x-auth"]).toBeFalsy()
        })
        .end(done)
    });

    it("should refuse a non registered user", done => {
        request(app)
        .post("/login")
        .send({
            email: "not@registered.yet",
            password: "whatever"
        })
        .expect(401)
        .expect(res => {
            expect(res.headers["x-auth"]).toBeFalsy()
        })
        .end(done)
    });
}) 

describe("DELETE /logout", () => {
    it("should delete a token that is correct", done => {
        request(app)
            .delete("/logout")
            .set("x-auth", tmpToken)
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                expect(res.body.nModified).toBe(1);
                done();
            })
    });

    it("should go 401 for a incorrect token", done => {
        request(app)
            .delete("/logout")
            .set("x-auth", "whatever")
            .expect(401)
            .end(done)
    });
})

