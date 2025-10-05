import { NextRequest, NextResponse } from "next/server";
import { deployAgent, AgentDeployData } from "@/lib/deployAgent";

export async function POST(req: NextRequest) {
  try {
    const body: AgentDeployData = await req.json();

    if (!body.name || !body.description) {
      return NextResponse.json({ error: "Name and Description are required" }, { status: 400 });
    }

    const apiKey = process.env.AXICOV_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "AXICOV_API_KEY not set" }, { status: 500 });

    const result = await deployAgent(body, apiKey);

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
