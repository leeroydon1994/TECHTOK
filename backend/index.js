const express = require("express");
const cors = require("cors"); // CORS - Cross Origin Resource Sharing
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const AuthRoutes = require("./routes/auth");
app.use(AuthRoutes);

const BlogRoutes = require("./routes/blog");
app.use(BlogRoutes);

const DashboardRoutes = require("./routes/dashboard");
app.use(DashboardRoutes);

const FaveRoutes = require("./routes/fave");
app.use(FaveRoutes);

const RatingsRoutes = require("./routes/ratings");
app.use(RatingsRoutes);

const Nasdaq100Routes = require("./routes/nasdaq100.js");
app.use(Nasdaq100Routes);

const StockTagsRoutes = require("./routes/stockTags.js");
app.use(StockTagsRoutes);

app.listen(8080, () => {
  console.log("Application is listening to port 8080!");
});
