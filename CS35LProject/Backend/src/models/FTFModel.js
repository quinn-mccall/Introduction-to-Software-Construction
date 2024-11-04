class FTF {
    constructor (id, appUserId, categoryId, amount, registrationDate, frequency, dayOfMonth, description, enabled, fk_FinancialTransactionFixed_appUserId, fk_FinancialTransactionFixed_categoryId){
        this.id = id; 
        this.appUserId = appUserId;
        this.categoryId = categoryId;
        this.amount = amount;
        this.registrationDate = registrationDate;
        this.fequency = frequency;
        this.dayOfMonth = dayOfMonth;
        this.description = description;
        this.enabled = enabled;
        this.fk_FinancialTransactionFixed_appUserId = fk_FinancialTransactionFixed_appUserId;
        this.fk_FinancialTransactionFixed_categoryId = fk_FinancialTransactionFixed_categoryId;
    }
}

module.exports = FTF;