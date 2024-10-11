import fileSystem from "./fileSystem.js";

export default class extends fileSystem {
  constructor(props) {
    super(props);

    this.socket = props.socket;
    this.clientId = props.clientId;

    this.creator = props.creator || false;
  }

  isCreator() {
    return this.creator;
  }
  setCreator() {
    this.creator = true;
  }
  setUsername(username) {
    this.username = username;
  }
  getUsername() {
    return this.username || null;
  }
  getClientId() {
    return this.clientId || null;
  }
  getFiles() {
    if (this.creator) {
      return super.getFiles();
    }
  }
  disconnect() {
    this.socket.disconnect();
  }
}
