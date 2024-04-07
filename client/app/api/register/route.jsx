
import { writeFileSync } from 'fs';
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const data = await request.json();

        const existingData = require('data/usersData.json');
        const updatedData = [...existingData, data];

        writeFileSync('data/usersData.json', JSON.stringify(updatedData));
        return NextResponse.json({
            message: "Saving data...",
            status: 200
        });

    } catch (error) {
        console.error("Error processing the request:", error);
        return NextResponse.json({
            message: "Error processing the request",
            status: 500
        });
    }
}

