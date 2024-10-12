export default class clientHandle {
  constructor(props) {
    this.io = props.io;
    this.socket = props.socket;
    this.connections = props.connections;
  }

  init() {
    this.socket.on("registerConnection", (clientId) => {
      if (clientId == null) return;
      try {
        const client = this.connections.newConection({ socket: this.socket });

        this.socket.emit("connectInfo", {
          clientId: client.getClientId(),
          creator: client.isCreator(),
        });
        console.log(`clientConnect: ${clientId}`);
      } catch (error) {
        console.log(`clientConnect ERROR: ${clientId} ${error}`);
      }
    });

    this.socket.on("setUsername", (username) => {
      this.connections.getConnection(this.socket.id)?.setUsername(username);
      this.socket.emit("userData", {
        username: this.connections.getConnection(this.socket.id).getUsername(),
        creator: this.connections.getConnection(this.socket.id).isCreator(),
      });
      this.io.emit("userList", this.connections.getUsers());
      this.socket.emit(
        "filesContent",
        getFilesNames(this.connections.getFilesContent()),
      );
    });
  }
}

function getFilesNames(files) {
  const formatter = {};

  Object.keys(files).forEach((file) => {
    const fileName = file.split("/").at(-1);
    formatter[fileName] = files[file];
  });

  return formatter;
}
