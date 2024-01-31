import { NextRequest, NextResponse } from "next/server";
import status from "@/lib/http-status.json";
import { v4 as uuidv4 } from "uuid";
import rateLimit from "@/lib/rate-limit";
import { info, list } from "./ban";

const punishment = ['bans','mutes','warnings','kicks'];
type Punishment = (typeof punishment)[number];

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function GET(request: NextRequest, { params }: { params: { type: string } }) {
  if (!punishment.includes(params.type)) return NextResponse.json({ message: status["404"].description }, { status: 404 });
   
  const searchParams = request.nextUrl.searchParams;
  if (searchParams.get('id')) {
    if (/^[0-9]*$/.test(<string> searchParams.get('id'))) {
      return infoHandler(params.type, parseInt(<string> searchParams.get('id')));
    } else return NextResponse.json({ message: status["400"].description }, { status: 400 });
  }
  let page = 1, limit = 10;
  if (searchParams.get('page')) page = /^[0-9]*$/.test(<string> searchParams.get('page')) ? parseInt(<string> searchParams.get('page')) : 1;
  if (searchParams.get('limit')) limit = /^[0-9]*$/.test(<string> searchParams.get('limit')) ? parseInt(<string> searchParams.get('limit')) : 10;

  return listHandler(params.type, page, limit);
}

async function listHandler(type: Punishment, page: number, limit: number) {
  let data;
  switch (type) {
    case "bans":
      data = await list(page, limit);
      break;
  }
  return NextResponse.json(data, { status: 200 });
}

async function infoHandler(type: Punishment, id: number) {
  let data;
  switch (type) {
    case "bans":
      data = await info(id);
      break;
  }

  if (data == null) return NextResponse.json({ message: `Unable to find data for id ${id}` }, { status: 404 });
  return NextResponse.json(data, { status: 200 });
}