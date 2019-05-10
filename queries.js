"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queries {
    constructor() {
        this.users = 'SELECT * FROM t_clients';
        this.user = 'SELECT * FROM t_clients';
        this.specials = 'SELECT * , DATE_FORMAT(initial_date, "%e-%M-%y") as initial_dateT, DATE_FORMAT(end_date, "%e-%M-%y") as end_dateT FROM t_specials';
        this.special = 'SELECT * , DATE_FORMAT(initial_date, "%e-%M-%y") as initial_dateT, DATE_FORMAT(end_date, "%e-%M-%y") as end_dateT FROM t_specials';
    }
}
exports.Queries = Queries;
exports.usersQuery = new Queries().users;
exports.userQuery = new Queries().user;
exports.specialsQuery = new Queries().specials;
exports.specialQuery = new Queries().special;
