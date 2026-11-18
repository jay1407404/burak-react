import axios from "axios";
import { serverApi } from "../../lib/config";
import { Member } from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      const url = this.path + "/member/topusers";
      const result = await axios.get<{ result: Member[] }>(url);
      console.log("getTopUsers:", result);

      return result.data.result;
    } catch (err) {
      console.log("Error, getTopUsers:", err);
      throw err;
    }
  }
}

export default MemberService;
