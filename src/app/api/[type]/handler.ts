import { config } from "@/lib/config";
import sql from "@/lib/mysql";
import status from "@/lib/http-status.json";
import { TPunishment } from "./route";
import { NextResponse } from "next/server";

export async function list(type: TPunishment, page: number, limit: number) {
    const { count } = (await sql({q: 'SELECT COUNT(id) AS count FROM '+ config.database.table_prefix + type , v: []}))[0];

    limit = limit > 0 && limit <= 100 ? limit : 10;
    const _tP = count % limit != 0 ? (Math.floor(count / limit) + 1) : count / limit;
    const _tC = page >= 1 && page <= _tP ? page : 1;

    let query = 'SELECT data.id, user.name as player, data.banned_by_name as operator, data.reason, data.time, ';
    if (type != "warnings") { 
        query += 'data.until, data.active, ' 
    } else { 
        query += 'data.warned, '
    }
    query += 'data.uuid FROM '+ config.database.table_prefix + type +' AS data LEFT JOIN '+ config.database.table_prefix +'history AS user ON data.uuid = user.uuid ORDER BY data.id DESC LIMIT ?,?';

    const _ex = await sql({
        q: query, 
        v: [(_tC - 1) * limit, limit]
    })

    _ex.forEach((ob) => delete ob.uuid);

    if (type != "warnings") _ex.forEach((ob) => ob.active = Buffer.from(ob.active, 'utf8').readInt8() ? true : false);
    if (type == "kicks") _ex.forEach((ob) => { delete ob.until; delete ob.active });
    if (type == "warnings") _ex.forEach((ob) => ob.warned = Buffer.from(ob.warned, 'utf8').readInt8() ? true : false);

    return {
        total: count,
        total_page: _tP,
        current_page: _tC,
        limit: limit,
        data: _ex
    }
}

export async function info(type: TPunishment, id: number) {
    let query = 'SELECT data.id, user.name as player, data.banned_by_name as operator, data.reason, data.time, data.until, data.server_origin as server, data.ipban, data.active, data.uuid, ';
    if (type == "kicks") {
        query += 'data.silent ';
    } else if (type == "warnings") {
        query += 'data.warned ';
    } else {
        query += 'data.removed_by_name as removed_operator, data.removed_by_reason as removed_reason ';
    }
    query += 'FROM '+ config.database.table_prefix + type +' AS data LEFT JOIN '+ config.database.table_prefix +'history AS user ON data.uuid = user.uuid WHERE data.id = ?';

    const _data = await sql({
        q: query, 
        v: [id]
    })

    if (!_data[0]) return NextResponse.json({ message: `No resources found for type ${type} matching id ${id}` }, { status: 404 });
    _data[0].ipban = Buffer.from(_data[0].ipban, 'utf8').readInt8() ? true : false;
    _data[0].active = Buffer.from(_data[0].active, 'utf8').readInt8() ? true : false;
    _data[0].until == -1 ? _data[0].until = 0 : undefined;

    if (type == "bans" || type == "mutes") {
        if (_data[0].removed_operator == "#expired") {
            _data[0].removed_operator = null;
            _data[0].expired = true;
        } else {
            _data[0].expired = false;
        }
    }

    if (type == "kicks" || type == "warnings") {
        delete _data[0].until;
        delete _data[0].ipban;
        delete _data[0].active;
        type == "kicks" ? _data[0].silent = Buffer.from(_data[0].silent, 'utf8').readInt8() ? true : false : {};
        type == "warnings" ? _data[0].warned = Buffer.from(_data[0].warned, 'utf8').readInt8() ? true : false : {};
    }

    delete _data[0].uuid;
    return NextResponse.json(_data[0], { status: 200 });
}