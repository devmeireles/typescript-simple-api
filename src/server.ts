import "module-alias/register";
import app from "./app";

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
