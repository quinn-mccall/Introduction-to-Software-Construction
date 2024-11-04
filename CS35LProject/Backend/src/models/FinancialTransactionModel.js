class FinancialTransaction {
    constructor (id, appUserId, categoryId, amount, transactionDate, description, canceled){
        this.id = id; 
        this.appUserId = appUserId;
        this.categoryId = categoryId;
        this.amount = amount;
        this.transactionDate = transactionDate;
        this.description = description;
        this.canceled = canceled;
    }
}

module.exports = FinancialTransaction;