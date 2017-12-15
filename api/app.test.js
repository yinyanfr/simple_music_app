const expect = require("expect");
const request = require("supertest");
const User = require("./user"),
      Song = require("./song"),
      Playlist = require("./playlist");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const {isEqual} = require("lodash");

const {app} = require("./app");

const existUser = {
    email: "i@yinyan.fr",
    password: "123456",
    pseudo: "ucec"
}
const testUserPw = "123456";
const testUser = {
    email: "i@73000.fr",
    password: testUserPw,
    pseudo: "ucec"
};

const fakeUser = {
    email: "not.a.email",
    pseudo: "1"
};

const testPl = {
    name: "Lorem Ipsum"
}

var tmpToken = "";

const removeTestUser = done => {
    User.findOneAndRemove({email: testUser.email})
        .then(() => done())
};

const removeTestSong = done => {
    Song.findOneAndRemove({link: songValid.link})
        .then(() => done())
};

const removeTestPl = done => {
    Playlist.findOneAndRemove({name: testPl.name})
        .then(() => done())
}

beforeEach(removeTestUser);
beforeEach(removeTestSong);
beforeEach(removeTestPl);

describe("POST /register to register a new unique user", () => {
    it("should register a new user when data is valid", (done) => {
        request(app)
            .post("/register")
            .send(testUser)
            .expect(200) // should success
            .expect(res => {
                // res should be identique as it is defined
                const {email, pseudo} = res.body;
                expect(email).toBe(testUser.email);
                expect(pseudo).toBe(testUser.pseudo);
                // should receive nothing more
                expect(Object.keys(res.body).length).toBe(2);
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
            .send(testUser)
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                request(app)
                    .post("/register")
                    .send(testUser)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.code).toBe(11000)
                    })
                    .end(done)
            })
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

const testNewsong = (done, callback) => {
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
                if(callback) return callback(songs[0].sid);
                return done()
            })
            .catch(err => done(err))
    })
}

describe("POST /newsong to add a new song into [db]", () => {
    it("should add a new song when info is valid", done => {
        return testNewsong(done)
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

    it("should do nothing for a song with indentique link, but still act as if it is added", done => {
        request(app)
            .post("/newsong")
            .send(existSong)
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                const {sid, link} = res.body;
                Song.findOne({sid})
                    .then(song => {
                        expect(song).toBeDefined();
                        expect(link).toBe(song.link);
                        done();
                    })
                    .catch(err => done(err))
            })
    })
});

describe("GET /song to get link of a song by its sid", () => {
    it("should return return link to a sid given", done => {
        Song.findOne({})
            .then(song => {
                expect(song).toBeDefined();
                const {sid} = song;
                request(app)
                    .get(`/song/${sid}`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.sid).toBe(sid)
                    })
                    .end(done)
            })
    });

    it("should return 404 to a sid non-exist", done => {
        request(app)
            .get("/song/something_else")
            .expect(404)
            .end(done)
    })
});

const testLogin = (done, callback) => {
    request(app)
    .post("/register")
    .send(testUser)
    .expect(200)
    .end((err, res) => {
        if(err) return done(err);
        const {email, pseudo} = res.body;
        request(app)
            .post("/login")
            .send({email, pseudo, password: testUserPw})
            .expect(200)
            .expect(res => {
                var token = res.headers["x-auth"];
                expect(token).toBeTruthy()
            })
            .end((err, res) => {
                if(err) return done(err);
                if(callback) return callback(res.headers["x-auth"]);
                // token should be registered into db
                User.findOne({email})
                    .then(user => {                    
                        expect(user).toBeDefined();
                        const tokens = user.toObject().tokens;
                        expect(tokens[tokens.length - 1]).toMatchObject({
                            access: "auth",
                            token: res.headers["x-auth"]
                        });
                        done()                  
                    })
                    .catch(err => done(err))
            })
    })
};

describe("POST /login to log in a user and generate him a token", () => {
    it("should return token for a existing correct user", done => {
        return testLogin(done)
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

describe("DELETE /logout to log out a user and delete its token", () => {
    it("should delete a token that is correct", done => {
        return testLogin(done, token => {
            request(app)
            .delete("/logout")
            .set("x-auth", token)
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                expect(res.body.nModified).toBe(1);
                done();
            })
        })
    });

    it("should go 401 for a incorrect token", done => {
        request(app)
            .delete("/logout")
            .set("x-auth", "whatever")
            .expect(401)
            .end(done)
    });
});

const testNewPl = (done, callback) => {
    return testLogin(done, token => {
        request(app)
            .post("/newplaylist")
            .set("x-auth", token)
            .send(testPl)
            .expect(200)
            .expect(res => {
                expect(res.body.creator).toBe(testUser.email)
            })
            .end((err, res) => {
                if(err) return done(err);
                const {pid} = res.body;
                if(callback) return callback(token, pid);
                else{
                    Playlist.findOne({pid})
                            .then(pl => {
                                expect(pl).toBeDefined();
                                expect(pl.pid).toBe(pid);
                                done();
                            })
                            .catch(err => done(err))
                }
            })
    })
};

describe("POST /newplaylist to create a playlist for a user", () => {
    it("should add a playlist as long as a valid user is logged in", done => {
        return testNewPl(done)
    })
});

describe("POST /pushsid to push an existing song into a [playlist] by its creator", () => {
    it("should push a song into a pl with correct sid and pid", done => {
        return testNewPl(done, (token, pid) => {
            return testNewsong(done, sid => {
                request(app)
                    .post("/pushsid")
                    .set("x-auth", token)
                    .send({pid, sid})
                    .expect(200)
                    .end((err, res) => {
                        if(err) return done(err);
                        Playlist.findOne({pid})
                                .then(pl => {
                                    if(!pl) return Promise.reject("playlist not found");
                                    const {songs} = pl;
                                    expect(songs[songs.length - 1].sid).toBe(sid);
                                    done()
                                })
                                .catch(err => done(err))
                    })
            })
        })
    });

    it("should NOT touch a playlist that is not created by the user", done => {
        return testNewPl(done, (token, pid) => {
            return testNewsong(done, sid => {
                request(app)
                    .post("/pushsid")
                    .set("x-auth", token+"1")
                    .send({pid, sid})
                    .expect(401)
                    .end(done)
            })
        })
    })
});

describe("GET /me to verify the identity of a user with its stored token", () => {
    it("should go 200 with email and pseudo of the user corresponding a given token", done => {
        return testLogin(done, token => {
            request(app)
                .get("/me")
                .set("x-auth", token)
                .expect(200)
                .expect(res => {
                    expect(res.body).toMatchObject({
                        email: testUser.email,
                        pseudo: testUser.pseudo
                    })
                })
                .end(done)
        })
    });

    it('should go 401 for an invalid token', done => {
        return testLogin(done, token => {
            request(app)
                .get("/me")
                .set("x-auth", token+"1")
                .expect(401)
                .end(done)
        })
    })
});

describe("GET /mylist to list all playlists created by a user", () => {
    it("should get every list created by a valid user with his token", done => {
        return testNewPl(done, (token, pid) => {
            request(app)
                .get("/mylist")
                .set("x-auth", token)
                .expect(200)
                .expect(res => {
                    res.body.forEach(e => {
                        expect(e.creator).toBe(testUser.email)
                    })
                })
                .end(done)
        })
    });

    it("should go 401 for an invalid token", done => {
        return testNewPl(done, (token, pid) => {
            request(app)
                .get("/mylist")
                .set("x-auth", token+"1")
                .expect(401)
                .end(done)
        })
    })
});

describe("DELETE /deletepl to delete a playlist created by user", () => {
    it("should delete a playlist created by a user by its pid", done => {
            return testNewPl(done, (token, pid) => {
                request(app)
                    .delete("/deletepl")
                    .set("x-auth", token)
                    .send({pid})
                    .expect(200)
                    .end((err, res) => {
                        if(err) return done(err);
                        Playlist.findOne({pid})
                                .then(pl => {
                                    expect(pl).toBeTruthy();
                                    expect(pl.creator).toBe("nobody");
                                    done();
                                })
                                .catch(err => done(err))
                    })
            })
    });

    it("should go 401 when a user attempt to delete a playlist that is not created by him", done => {
            return testNewPl(done, (token, pid) => {
                request(app)
                    .delete("/deletepl")
                    .set("x-auth", token+"1")
                    .send({pid})
                    .expect(401)
                    .end(done)
            })
        });
});

const testToggle = (done, callback) => {
    testNewPl(done, (token, pid) => {
        request(app)
            .patch("/toggleVis")
            .set("x-auth", token)
            .send({pid})
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                if(callback){
                    return callback(token, pid)
                }else{
                    Playlist.findOne({pid})
                        .then(pl => {
                            expect(pl).toBeDefined();
                            expect(pl.isPrivate).toBe(!testPl.isPrivate);
                            done();
                        })
                        .catch(err => done(err))
                }
            })
    })
}

describe("PATCH /toggleVis to toggle visuabilty of a playlist created by its user by its pid", () => {
    it("should toggle visuabily when user is correct", done => {
        return testToggle(done)
    })
});

describe("PATCH /pllistened/:pid", () => {
    it("should increase 1 listenedTimes", done => {
        testNewPl(done, (token, pid) => {
            request(app)
                .patch(`/pllistened/${pid}`)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)
                    Playlist.findOne({pid})
                                .then(pl => {
                                    expect(pl).toBeTruthy();
                                    expect(pl.listenedTimes).toBe(1);
                                    done()
                                })
                                .catch(err => done(err))
                })
        })
    })
})

describe("PATCH /plshared/:pid", () => {
    it("should increase 1 sharedTimes", done => {
        testNewPl(done, (token, pid) => {
            request(app)
                .patch(`/plshared/${pid}`)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)
                    Playlist.findOne({pid})
                                .then(pl => {
                                    expect(pl).toBeTruthy();
                                    expect(pl.sharedTimes).toBe(1);
                                    done()
                                })
                                .catch(err => done(err))
                })
        })
    })
})

const modifiedpl = {
    name: "modified",
    msg: "this is modified",
    isPrivate: true
}

describe("POST /modifypl", () => {
    const {name, msg, isPrivate} = modifiedpl
    it("should modify playlist when authorized", done => {
        testNewPl(done, (token, pid) => {
            request(app)
                .post("/modifypl")
                .set("x-auth", token)
                .send({pid, name, msg, isPrivate})
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    Playlist.findOne({pid})
                        .then(pl => {
                            expect(pl).toBeTruthy();
                            expect(pl.name).toBe(name);
                            expect(pl.msg).toBe(msg);
                            expect(pl.isPrivate).toBe(isPrivate);
                            done()
                        })
                        .catch(err => done(err))
                })
        })
    })
})

// API Removed

// describe(`GET /songlist/:pid to every song in a playlist by its pid, 
// authentification is required should the playlist be private`, () => {
//     it("should list every song in a playlist public", done => {
//         return testNewPl(done, (token, pid) => {
//             request(app)
//                 .get(`/songlist/${pid}`)
//                 .expect(200)
//                 .end((err, res) => {
//                     if(err) return done(err);
//                     Playlist.findOne({pid})
//                             .then(pl => {
//                                 expect(isEqual(res.body, pl)).toBe(true);
//                                 done();
//                             })
//                             .catch(err => done(err))
//                 })
//         })
//     });

//     it("should work for a private playlist with authentification", done => {
//         return testToggle(done, (token, pid) => {
//             request(app)
//                 .get(`/songlist/${pid}`)
//                 .set("x-auth", token)
//                 .expect(200)
//                 .end((err, res) => {
//                     if(err) return done(err);
//                     Playlist.findOne({pid})
//                             .then(pl => {
//                                 expect(isEqual(res.body, pl.songs)).toBe(true);
//                                 done();
//                             })
//                             .catch(err => done(err))
//                 })
//         })
//     });

//     it("should go 401 for a private playlist without proper authentification", done => {
//         return testToggle(done, (token, pid) => {
//             request(app)
//                 .get(`/songlist/${pid}`)
//                 .set("x-auth", token+"1")
//                 .expect(401)
//                 .end(done)
//         })
//     })
// })



