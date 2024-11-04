class Category{
    constructor(id, appUserId, name, type, description, enabled) {
        this.id = id;
        this.appUserId = appUserId;
        this.name = name;
        this.type = type; //Income[I] or expense[E]
        this.description = description;
        this.enabled = enabled;
    }
}

module.exports = Category;