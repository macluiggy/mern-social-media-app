import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index";
const assert = chai.assert;
chai.use(chaiHttp);

describe("it should pass", () => {
  it("should pass", () => {
    chai.expect(1).to.equal(1);
  });
});

describe("should pass the server request", () => {
  it("should return 200", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        assert.equal(res.text, "Hello World!");
        done();
      });
  });
  it("Should pass the test from /api/hello", (done) => {
    chai
      .request(server)
      .get("/api/hello")
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        assert.equal(res.text, "Hello World from api!");
        done();
      });
  });
});
