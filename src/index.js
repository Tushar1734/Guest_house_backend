import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import poolPromise from "./DB/index.js";

poolPromise
.then(result => {
  console.log('DATABASE CONNECTION SUCCESSFUL..!');
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})
.catch(error => {
  console.log('Database connection failed:', error);
});
