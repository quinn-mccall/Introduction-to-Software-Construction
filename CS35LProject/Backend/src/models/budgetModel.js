class Budget {
    constructor (id, userId, amount, month, year, registrationDate){
        this.id = id; 
        this.userId = userId;
        this.amount = amount;
        this.month = month;
        this.year = year;
        this.registrationDate = registrationDate;
    }
}

module.exports = Budget;