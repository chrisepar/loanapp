import controllers from "./controllers";
import { Router } from "express";
import { getLoanValidation, loanValidation } from "./validation";

const router = Router();

router.get("/status", controllers.getStatuses);
router.get("/summary", controllers.getLoansSummary);
router.get("/", controllers.getLoans);
router.get("/:loan_id", getLoanValidation, controllers.getLoans);
router.post("/", loanValidation, controllers.postLoan);
router.put("/:loan_id", loanValidation, controllers.putLoan);
router.delete("/:loan_id", getLoanValidation, controllers.deleteLoan);
export default router;
