const { connection } = require('./connection');

class Database {
    constructor() {
        this.connection = connection;
    }

    async query(sql, params) {
        return await this.connection.query(sql, params, (error, results) => {
            if (error) {
                return error;
            }
            return results;
        });
    };

    close() {
        this.connection.end();
    }
}

module.exports = Database;


module.exports = { Database };
