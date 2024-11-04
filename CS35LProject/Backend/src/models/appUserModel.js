class AppUser {
    constructor (id, firstName, lastName, username, password, address, email, phoneNumber, birthDate, gender, registrationDate, enabled){
        this.id = id; 
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.gender = gender;
        this.registrationDate = registrationDate;
        this.enabled = enabled;
    }
}

module.exports = AppUser;