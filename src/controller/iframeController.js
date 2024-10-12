class controller {
  renderIframe(req, res) {
    try {
      res.status(200).render("index.html");
    } catch (error) {
      console.log(error);
      res.status(500).json({ text: "Server Error", error });
    }
  }
  getFiles(req, res) {
    try {
      res.status(200).sendFile(req.url.replace("/", ""), { root: "./live" });
    } catch (error) {
      res.status(404).json({ text: "File not found", error });
    }
  }
}
export default new controller();
