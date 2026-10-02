/**
 * 인스타그램 피드 수동 관리 (어드민이 생기기 전까지).
 *
 *   npm run ig -- list
 *   npm run ig -- add https://www.instagram.com/reel/XXXX/ "English title"
 *   npm run ig -- pin XXXX          # 맨 앞 고정 (다시 하면 해제)
 *   npm run ig -- hide XXXX         # 숨기기 (다시 하면 보이기)
 *   npm run ig -- remove XXXX
 *
 * 자동 수집은 하지 않는다 (2026-10-02 결정). 피드는 이 명령으로만 관리한다.
 */
import mongoose from "mongoose";

const DB = "seveny";
const [cmd, arg, ...rest] = process.argv.slice(2);
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI 가 없습니다. .env.local 을 확인하세요.");
  process.exit(1);
}

function parse(input: string): { code: string; type: "reel" | "post" } | null {
  const m = input.match(/instagram\.com\/(?:[^/]+\/)?(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  if (m) return { code: m[2], type: m[1] === "p" ? "post" : "reel" };
  return /^[A-Za-z0-9_-]{5,40}$/.test(input) ? { code: input, type: "reel" } : null;
}

await mongoose.connect(uri, { dbName: DB, serverSelectionTimeoutMS: 10000 });
const col = mongoose.connection.db!.collection("instagram");
const now = new Date();

switch (cmd) {
  case "list": {
    const rows = await col.find().sort({ pinned: -1, takenAt: -1, order: 1 }).toArray();
    for (const r of rows) {
      console.log(`${r.pinned ? "📌" : "  "}${r.hidden ? "🙈" : "  "} ${r.code}  ${r.title || r.caption || ""}  [${r.source}]`);
    }
    console.log(`${rows.length}건`);
    break;
  }
  case "add": {
    const p = arg && parse(arg);
    if (!p) throw new Error("인스타그램 게시물 링크나 코드를 주세요.");
    await col.updateOne(
      { code: p.code },
      {
        $set: { type: p.type, title: rest.join(" "), updatedAt: now },
        $setOnInsert: { caption: "", takenAt: now, pinned: false, hidden: false, order: 0, source: "manual", createdAt: now },
      },
      { upsert: true },
    );
    console.log(`등록: ${p.code}`);
    break;
  }
  case "pin":
  case "hide": {
    const field = cmd === "pin" ? "pinned" : "hidden";
    const row = await col.findOne({ code: arg });
    if (!row) throw new Error(`없는 코드: ${arg}`);
    await col.updateOne({ code: arg }, { $set: { [field]: !row[field], updatedAt: now } });
    console.log(`${arg} ${field} = ${!row[field]}`);
    break;
  }
  case "remove": {
    const r = await col.deleteOne({ code: arg });
    console.log(r.deletedCount ? `삭제: ${arg}` : `없는 코드: ${arg}`);
    break;
  }
  default:
    console.log("사용법: npm run ig -- list | add <url> [title] | pin <code> | hide <code> | remove <code>");
}

await mongoose.disconnect();
