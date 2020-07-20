const pool = require('../database/pooling');
const { query } = require('../database/pooling');

const entry_time = async (usr_id) => {
    const query1 = await pool.query(`SELECT count(id) as total FROM dichvu WHERE u_id = $1`, [usr_id]);
    const entry_time = query1.rows[0].total;
    return entry_time;
}

const general_start_current_days = async (usr_id) => {
    try {
        const query1 = await pool.query(`SELECT min(created_at_date) as min, max(created_at_date) as max FROM history WHERE usr_id = $1`, [usr_id]);
        const start_date = query1.rows[0].min;
        const current_date = query1.rows[0].max;
        
        const query2 = await pool.query(`SELECT DATE_PART('day', $1::timestamp - $2::timestamp)`,[current_date, start_date]);
        const date_diff = query2.rows[0].date_part;
        return {start_date, current_date, date_diff}
    } catch (err) {
        throw new Error(err);
    }
}

const total_money_spent = async (usr_id) => {
    const query1 = await pool.query(`SELECT amount FROM dichvu WHERE u_id = $1`, [usr_id]);
    const query1_array_rows_amount = query1.rows;

    let total = 0;
    const array_of_amounts = query1_array_rows_amount.map((each_object) => each_object.amount);

    for(let i = 0; i < array_of_amounts.length; i++) {
        total = total + array_of_amounts[i];
    }
    return total;
}


const get_individual_odometer = async (history_form) => {
    const {type_of_form, id_private_form} = history_form;

    if(type_of_form === 'napnhienlieu') return pool.query(`select odometer from napnhienlieu where id = $1`, [id_private_form]);
    if(type_of_form === 'chiphi') return pool.query(`select odometer from chiphi where id = $1`, [id_private_form]);
    if(type_of_form === 'dichvu') return pool.query(`select odometer from dichvu where id = $1`, [id_private_form]);
    if(type_of_form === 'thunhap') return pool.query(`select odometer from thunhap where id = $1`, [id_private_form]);
    if(type_of_form === 'quangduong') return pool.query(`select final_odometer as odometer from quangduong where id = $1`, [id_private_form]);
};

const total_odometer_driven = async (usr_id, start_date, current_date) => {
    try {
        const query1 = await pool.query(`
        (SELECT type_of_form, id_private_form, created_at_date
        FROM history
        WHERE (usr_id = $1) AND (created_at_date = $2) AND (created_at_time = ( SELECT min(created_at_time)
                                                                                FROM history 
                                                                                WHERE usr_id = $1 AND created_at_date = $2  )))
        UNION
        (SELECT type_of_form, id_private_form, created_at_date
        FROM history
        WHERE (usr_id = $1) AND (created_at_date = $3) AND (created_at_time = ( SELECT max(created_at_time)
                                                                                FROM history
                                                                                WHERE usr_id = $1 AND created_at_date = $3  )))
        ORDER BY created_at_date ASC
        `, [usr_id, start_date, current_date]);

        if(query1.rowCount !== 2) throw new Error(`Return more than 2 rows (${query1.rowCount} rows) in oldest_lastest forms for odometer diff in DichVu`);
        
        const _2_odometers_promise = await Promise.all(query1.rows.map((each_row) => get_individual_odometer(each_row)));
        const _2_odometers = _2_odometers_promise.map((each_row) => parseFloat(each_row.rows[0].odometer));
        const total_odometer_diff = _2_odometers[1] - _2_odometers[0];
        return total_odometer_diff;
    } catch (err) {
        throw new Error(err);
    }
}



module.exports = {
    print_report: async (usr_id) => {
        const total_entry_time = await entry_time(usr_id);
        const days = await general_start_current_days(usr_id);
        const {start_date, current_date, date_diff} = days;

        const money_spent = await total_money_spent(usr_id);

        const by_date = parseFloat(((money_spent / date_diff).toFixed(3)));

        const total_km_driven = await total_odometer_driven(usr_id, start_date, current_date);

        const by_km = parseFloat(((money_spent / total_km_driven).toFixed(3)));
        return {total_entry_time, days, money_spent, by_date, by_km};
    }
}