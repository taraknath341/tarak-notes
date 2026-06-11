import statusHTML from "../views/status.html.js";

// Error handle Middleware function

export default (err, req, res, next) => {
   res.status(err?.status ? err.status : 500).send(statusHTML(err?.status ? err.status : 500, err.message));
   if (err.status == null || err.status === 500) {
      console.log(err);
   }
}