export class Queries{
    users = 'SELECT * FROM t_clients';
    user = 'SELECT * FROM t_clients';

    specials = 'SELECT * , DATE_FORMAT(initial_date, "%e-%M-%y") as initial_dateT, DATE_FORMAT(end_date, "%e-%M-%y") as end_dateT FROM t_specials';
    special = 'SELECT * , DATE_FORMAT(initial_date, "%e-%M-%y") as initial_dateT, DATE_FORMAT(end_date, "%e-%M-%y") as end_dateT FROM t_specials';
}

export const usersQuery = new Queries().users;
export const userQuery = new Queries().user;

export const specialsQuery = new Queries().specials;
export const specialQuery = new Queries().special;