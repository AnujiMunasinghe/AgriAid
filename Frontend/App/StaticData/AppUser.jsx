class AppUser {

    static _id;
    static _name;
    static _email;
    static _role;

    AppUser(id, name, email, role) {
        _id = id
        _name = name
        _email = email
        _role = role
    }

    fetch() {
        const user = {
            id: _id,
            name: _name,
            email: _email,
            role: _role
        }
        return user
    }
}

export default AppUser