import { authorize } from "@liveblocks/node";
import { NextResponse } from "next/server";
import { getServerSession as originalGetServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const secret: string = "sk_dev_-Un0vvh53r5jH-1Sq-irrm5D6mA9_Tv8pS5EdDmg0L2ZS4cb71ZzZQs3Cy_lab4b" as string;

const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
];

export async function POST(request: Request) {
  const session = await originalGetServerSession(authOptions);

  if (!session?.user?.id) throw new Error("No session found");

  const req = await request.json()
  const room = req.room;
  const result = await authorize({
    room,
    secret,
    userId: session.user.email as string,
    groupIds: [],
    userInfo: {
      name: session.user.name,
      image: session.user.image,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
  });
  return NextResponse.json(JSON.parse(result.body), { status: result.status });
}


type AccessArray = Array<string>;

interface UserAccesses {
  [key: string]: AccessArray;
}

interface GroupAccesses {
  [key: string]: AccessArray;
}

export interface Room {
  type: string;
  id: string;
  lastConnectionAt: string;
  createdAt: string;
  metadata: {
    name: string;
    ownerId: string;
  };
  defaultAccesses: AccessArray;
  groupsAccesses: GroupAccesses;
  usersAccesses: UserAccesses;
}

export type Rooms = Array<Room>;