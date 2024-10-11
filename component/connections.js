import Client from "./client.js";

export default class {
  connections = [];

  newConection(socket) {
    const clientId = socket.socket.id;

    if (this.getConnection(clientId))
      return new Error("Connection already exists");
    const creator = this.connections.length == 0 ? true : false;

    const client = new Client({
      socket,
      clientId,
      creator,
    });

    if (creator) client.createRootDir("./live");
    this.connections.push(client);
    return client;
  }

  deleteConnection(clientId) {
    const userStatus = this.getConnection(clientId);
    if (userStatus == null) return;

    // TODO:  Закончить удаление после false
    this.connections = this.connections.filter((client) => {
      if (client.getClientId() == clientId) return false;
      return true;
    });

    if (userStatus) {
      const getUser = this.connections[0];
      if (getUser == null) return;

      getUser.setCreator();
      getUser.createRootDir("./live");
    }
  }

  getConnection(clientId) {
    return (
      this.connections.find((client) => client.getClientId() == clientId) ||
      null
    );
  }

  getCreator() {
    return this.connections.find((client) => client.isCreator()) || null;
  }
  disconnect(clientId) {
    this.getConnection(clientId).disconnect();
    this.deleteConnection(clientId);
  }
}
