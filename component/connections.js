export default class {
  connection = [];

  newConection(client) {
    this.conection.push(client);
  }

  deleteConnection(clientId) {
    this.conection = this.conection.filter((client) => {
      if (client.getClientId() == clientId) return false;
      return true;
    });
  }
  getConnection(clientId) {
    return this.connection.find((client) => client.getClientId() == clientId);
  }
}
