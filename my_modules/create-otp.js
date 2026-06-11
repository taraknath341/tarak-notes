export default function () {
  let otp = "";
  for (let c = 6; c; c--) {
    otp += Math.round(Math.random() * 9);
  }
  return otp;
}