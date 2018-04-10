let mongoose = require('mongoose')
let Blog = require('../models/Blog')

let chai = require("chai")
let chaiHttp = require("chai-http")
let server = require("../index")
let should = chai.should()



chai.use(chaiHttp)

describe("Blogs", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Blog.remove({}, err => {
      done()
    })
  })

  describe("/GET blog", () =>{
    it("Should get all the blogs", done => {
      chai
        .request(server)
        .get("/api/blogs/list")
        .end((err, res) => {
          res.shoud.have.status(200)
          res.body.should.be.a("array")
          res.body.length.should.be.eql(0)
          done()
        })
    })
  })
})
