var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer CHASECK_TEST-sFmHENKuOyJTAqjEYS0Cjqpz2UlHEKTy"
);

var raw = "";

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch(
  "https://api.chapa.co/v1/transaction/verify/chewatatest-6669",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
