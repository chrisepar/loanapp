import { param, body } from 'express-validator';

export const getLoanValidation = [
    param("loan_id")
        .notEmpty().withMessage("Cannot be empty.")
        .isUUID().withMessage("Should be in UUID format.")
        .escape()
];

export const loanValidation = [
    param("loan_id").if(param("loan_id").exists())
        .notEmpty().withMessage("Cannot be empty.")
        .isUUID().withMessage("Should be in UUID format.")
        .escape(),
    body("applicant_name")
        .notEmpty().withMessage("Cannot be empty.")
        .escape(),
    body("loaned_amount")
        .notEmpty().withMessage("Cannot be empty.")
        .isFloat({ min: 0 }).withMessage("Amount should be positive.")
        .escape().toFloat(),
    body("status_id")
        .notEmpty().withMessage("Amount should be positive.")
        .escape(),
];