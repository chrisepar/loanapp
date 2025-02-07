import { getLoans, getStatuses, postLoan, putLoan, deleteLoan, getLoansSummary } from "./services";
import { validationResult, matchedData, FieldValidationError } from 'express-validator';

const myValidationResult = validationResult.withDefaults({
    formatter: (error: FieldValidationError) => {
        return { "field": error.path, "message": error.msg, "value": error.value };
    }
});

export default {
    getLoans: async (req, res) => {
        try {
            const valid = myValidationResult(req);
            if (valid.isEmpty()) {
                const { loan_id } = matchedData(req);

                const dbResult = await getLoans(loan_id);

                if (dbResult.rowCount === 0) {
                    return res.status(404).send({ error: `No record found` });
                } else {
                    return res.json(dbResult.rows);
                }
            } else {
                return res.status(400).send({ error: valid.array() });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: `Internal Server Error: ${error}` });
        }
    },
    getLoansSummary: async (req, res) => {
        try {
            const dbResult = await getLoansSummary();
            return res.json(dbResult.rows);
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: `Internal Server Error: ${error}` });
        }
    },
    getStatuses: async (req, res) => {
        try {
            const dbResult = await getStatuses();
            return res.json(dbResult.rows);
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: `Internal Server Error: ${error}` });
        }
    },
    postLoan: async (req, res) => {
        try {
            const valid = validationResult(req);
            if (valid.isEmpty()) {
                const { applicant_name, loaned_amount, status_id } = matchedData(req);

                const dbResult = await postLoan({ applicant_name, loaned_amount, status_id });

                return res.status(201).send({ message: 'New Loan created', loan_id: dbResult.rows[0].loan_id });
            } else {
                return res.status(400).send({ error: valid.array() });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: `Internal Server Error: ${error}` });
        }
    },
    putLoan: async (req, res) => {
        try {
            const valid = validationResult(req);
            if (valid.isEmpty()) {
                const { loan_id, applicant_name, loaned_amount, status_id } = matchedData(req);

                const dbResult = await putLoan(loan_id, { applicant_name, loaned_amount, status_id });

                if (dbResult.rowCount === 0) {
                    return res.status(404).send({ error: `No record found` });
                } else {
                    return res.status(201).send({ message: 'Loan updated', loan_id: dbResult.rows[0].loan_id });
                }
            } else {
                return res.status(400).send({ error: valid.array() });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: `Internal Server Error: ${error}` });
        }
    },
    deleteLoan: async (req, res) => {
        try {
            const valid = validationResult(req);
            if (valid.isEmpty()) {
                const { loan_id } = matchedData(req);

                const dbResult = await deleteLoan(loan_id);

                if (dbResult.rowCount === 0) {
                    return res.status(404).send({ error: `No record found` });
                } else {
                    return res.status(201).send({ message: 'Loan deleted', loan_id: loan_id });
                }
            } else {
                return res.status(400).send({ error: valid.array() });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: `Internal Server Error: ${error}` });
        }
    },
};