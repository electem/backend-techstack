import http from "../http-common";
import { Test } from "../types/test.type";

class TestService {
  getTests() {
    return http.get<Array<Test>>("/tests");
  }
}

export default new TestService();
