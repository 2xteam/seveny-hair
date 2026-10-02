import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

/** 이 앱의 DB 이름. URI 경로나 환경 변수로 바꾸지 않는다 (볼트 `MongoDB Atlas` 참고). */
export const MONGODB_DB = "seveny";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const g = globalThis as typeof globalThis & { __sevenyMongoose?: MongooseCache };
const cached: MongooseCache = g.__sevenyMongoose ?? { conn: null, promise: null };
g.__sevenyMongoose = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI가 설정되어 있지 않습니다. .env.local을 확인하세요.");
  }
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: MONGODB_DB,
        maxPoolSize: 5,
        bufferCommands: false,
        serverSelectionTimeoutMS: 8000,
      })
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
