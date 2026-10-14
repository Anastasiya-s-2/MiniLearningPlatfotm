class User {
    constructor(id, name, email, password, role_id) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role_id = role_id;
    }
}

module.exports = User;