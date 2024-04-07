
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const data = await request.json();

        const users = require('data/usersData.json');
        let user = users.filter(u => u.email == data.email && u.password == data.password);
        user = user[0];

        if (user.length <= 0)
            throw new Error("Error");

        return NextResponse.json({ message: "User exists...", user, status: 200 });

    } catch (error) {
        console.error("Error processing the request:", error);
        return NextResponse.json({ message: "Error processing the request", status: 500 });
    }
}
