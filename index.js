import app from "./app.js";
import { connectDB } from "./database/connection.js";

connectDB();
app.listen(app.get("port"))
console.log(`Server on PORT ${app.get("port")}`)