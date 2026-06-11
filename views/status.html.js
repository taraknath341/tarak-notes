export default (status, message) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta name="author" content="Taraknath Karan">
  <meta charset="UTF-8">
  <link rel="shortcut icon" href="https://taraknath341.codeberg.page/client_storage/logo.svg" type="image/x-icon">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://taraknath341.codeberg.page/client_storage/404/style.css">
  <title>${status} | ${message}</title>
</head>

<body>
  <div>
    <h1><span>${status}</span><br> ${message}</h1>
  </div>
  <img src="https://taraknath341.codeberg.page/client_storage/logo.svg" alt="Tarak Program">
</body>

</html>
`;