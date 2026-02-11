import { addBook, deleteBook, getAllBook } from "../controllers/bookController.js";
import { isAuthenticate } from "../middlewares/authMiddleware.js";



const router = express.Router();

router.post("/admin/add", isAuthenticate, "Authorized", addBook);
router.get("/all", isAuthenticate, getAllBook);
router.post("/delete/:id", isAuthenticate, "Authorized", deleteBook);

export default router;