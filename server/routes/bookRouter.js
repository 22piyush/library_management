import { addBook, deleteBook, getAllBook } from "../controllers/bookController.js";
import { isAuthenticate, isAuthorized } from "../middlewares/authMiddleware.js";



const router = express.Router();

router.post("/admin/add", isAuthenticate, isAuthorized("Admin"), addBook);
router.get("/all", isAuthenticate, getAllBook);
router.post("/delete/:id", isAuthenticate, isAuthorized("Admin"), deleteBook);

export default router;