// 404 error throw

export default (req, res) => {
   throw {
      status: 404,
      message: "Page Not Found"
   }
}