import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import multer from "multer"
import morgan from "morgan"
import helmet, { crossOriginResourcePolicy } from "helmet"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import {register} from "./controllers/auth.js"

/* configuration*/
const app = express();
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
app.use(helmet());
app.use(crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended: true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));

/* file storage */

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/assets");
    },
    filename: function (req,file,cb){
        cb(null,file.originalname);
    }
});

const upload = multer({storage})

/*db connection*/
import connectDB from "./config/database.js"
connectDB();


/* routes with files*/
app.post("/auth/register", upload.single("picture"), register)


/*running it at port*/
const port = process.env.PORT || 4500;
app.listen(port, () =>{
    console.log(`server runniing at ${port}`);
})