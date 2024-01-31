import { config } from "@/lib/config";
import sql from "@/lib/mysql";

export async function list(page: number, limit: number) {
    const { count } = (await sql({q: 'SELECT COUNT(id) AS count FROM `'+ config.database.table_prefix +'bans`', v: []}))[0];

    limit = limit > 0 && limit <= 100 ? limit : 10;
    const _tP = count % limit != 0 ? (Math.floor(count / limit) + 1) : count / limit;
    const _tC = page >= 1 && page <= _tP ? page : 1;

    const _ex = await sql({
        q: 'SELECT data.id, user.name as player, data.banned_by_name as operator, data.reason, data.time, data.until, data.uuid FROM '+ config.database.table_prefix +'bans AS data LEFT JOIN '+ config.database.table_prefix +'history AS user ON data.uuid = user.uuid ORDER BY data.id DESC LIMIT ?,?', 
        v: [(_tC - 1) * limit, limit]
    })

    _ex.forEach((ob) => delete ob.uuid);

    return {
        total: count,
        total_page: _tP,
        current_page: _tC,
        limit: limit,
        data: _ex
    }
}

export async function info(id: number) {
    const _data = await sql({
        q: 'SELECT data.id, data.uuid, data.reason, data.banned_by_name, data.removed_by_name, data.removed_by_reason, data.time, data.until, data.server_origin, data.ipban, data.active, user.name FROM '+ config.database.table_prefix +'bans AS data LEFT JOIN '+ config.database.table_prefix +'history AS user ON data.uuid = user.uuid WHERE data.id = ?', 
        v: [id]
    })

    if (!_data[0]) return null;
    _data[0].ipban = Buffer.from(_data[0].ipban, 'utf8').readInt8() ? true : false;
    _data[0].active = Buffer.from(_data[0].active, 'utf8').readInt8() ? true : false;
    _data[0].until == -1 ? _data[0].until = 0 : undefined
    delete _data[0].uuid;
    return _data[0];
}