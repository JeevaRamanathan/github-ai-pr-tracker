"use server";

import fetch from "node-fetch";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const response = await fetch("https://devfest.ai/repositories");
    const text = await response.text();
    const startText = '<script id="__NEXT_DATA__" type="application/json">';
    const endText = "</script>";
    const startIndex = text.indexOf(startText) + startText.length;
    const endIndex = text.lastIndexOf(endText);
    const jsonData = JSON.parse(text.substring(startIndex, endIndex));

    let filteredRepoNames = jsonData.props.pageProps.repositories.map(
      (repo) => repo.nameOwner
    );

    return NextResponse.json({
      data: filteredRepoNames,
    });
  } catch (error) {
    NextResponse.json(
      { error: "Failed to fetch devfest.ai repositories!" },
      { status: 500 }
    );
  }
}
