import fileSystem from "./fileSystem.js";

export default class extends fileSystem {
  constructor(props) {
    super(props);

    this.socket = props.socket;
    this.clientId = props.clientId;

    this.admin = props.admin || false;
  }

  getAdmin() {
    return this.admin;
  }
  getClientId() {
    return this.clientId;
  }
}
