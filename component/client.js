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
  getClientId() {
    return this.clientId || null;
  }
  sendUpdate(updateFiles) {
    this.socket.emit("fileContent", updateFiles);
  }
  disconnect() {
    this.socket.disconnect();
  }
}
