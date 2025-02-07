import db from "../../db_connection";

export const getLoans = async (loan_id?: string) => {
    const query = `SELECT LOAN_ID AS ID, APPLICANT_NAME, LOANED_AMOUNT, STATUS_DESCRIPTION, LOANS.STATUS_ID  FROM LOANS
                    LEFT JOIN APPLICANTS ON APPLICANTS.APPLICANT_ID = LOANS.APPLICANT_ID
                    LEFT JOIN LOAN_STATUS ON LOAN_STATUS.STATUS_ID = LOANS.STATUS_ID WHERE LOANS.LOAN_ID = $1 OR $1 IS NULL`;
    const param = [loan_id];
    return db.query(query, param);
};

export const getLoansSummary = async () => {
    const query = `SELECT LOAN_STATUS.STATUS_DESCRIPTION, COUNT(LOAN_ID) AS NUMBER_OF_LOANS_PER_STATUS, COALESCE(SUM(LOANED_AMOUNT), 0) AS TOTAL_LOANED_AMOUNT_PER_STATUS 
                    FROM LOANS
                    RIGHT JOIN LOAN_STATUS ON LOANS.STATUS_ID = LOAN_STATUS.STATUS_ID
                    GROUP BY LOAN_STATUS.STATUS_DESCRIPTION`;
    return db.query(query);
};


export const postLoan = async ({ applicant_name, loaned_amount, status_id }: { applicant_name: string, loaned_amount: number, status_id: string }) => {
    const query = `WITH APPLICANT_INSERT AS (
                        INSERT INTO APPLICANTS (APPLICANT_NAME)
                        VALUES ($1)
                        RETURNING APPLICANT_ID
                    )
                    INSERT INTO LOANS (APPLICANT_ID, LOANED_AMOUNT, STATUS_ID)
                    VALUES ((SELECT APPLICANT_ID FROM APPLICANT_INSERT), $2, $3)
                    RETURNING LOAN_ID;`;
    const param = [applicant_name, loaned_amount, status_id];
    return db.query(query, param);
};

export const putLoan = async (loan_id: string, { applicant_name, loaned_amount, status_id }: { applicant_name: string, loaned_amount: number, status_id: string }) => {
    const query = `WITH LOAN_UPDATE AS (
                        UPDATE LOANS 
                            SET LOANED_AMOUNT = $3, STATUS_ID = $4
                        WHERE LOAN_ID = $1
                        RETURNING LOAN_ID, APPLICANT_ID
                    )
                    UPDATE APPLICANTS SET APPLICANT_NAME = $2 WHERE APPLICANT_ID IN (SELECT APPLICANT_ID FROM LOAN_UPDATE)
                    RETURNING (SELECT LOAN_ID FROM LOAN_UPDATE);`;
    const param = [loan_id, applicant_name, loaned_amount, status_id];
    return db.query(query, param);
};

export const deleteLoan = async (loan_id: string) => {
    const query = `DELETE FROM LOANS WHERE LOAN_ID = $1;`;
    const param = [loan_id];
    return db.query(query, param);
};

export const getStatuses = async () => {
    const query = `SELECT * FROM LOAN_STATUS`;
    return db.query(query);
};