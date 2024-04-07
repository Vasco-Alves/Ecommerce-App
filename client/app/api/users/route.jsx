
import { writeFileSync } from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const users = require('data/usersData.json').filter(user => user.username != 'admin');

        if (users.length > 0) {
            return NextResponse.json({
                message: "User exists...",
                users,
                status: 200
            });
        } else
            throw new Error("Error");

    } catch (error) {
        return NextResponse.json({
            message: "Error getting users...",
            status: 500
        })
    }
}

// Modifies user in file
export async function PUT(request) {
    const data = await request.json();
    try {
        const users = require('data/usersData.json');
        const updatedUsers = users.map(user => {
            if (user.username === data.username)
                return { ...user, ...data };
            return user;
        });

        writeFileSync('data/usersData.json', JSON.stringify(updatedUsers));
        return NextResponse.json({ message: 'Updated data successfully', status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing the request', status: 500 });
    }
}

// Deletes user from file
export async function DELETE(request) {
    const data = await request.json();
    try {
        const users = require('data/usersData.json');
        const filter = users.filter(user => user.username !== data.username);
        writeFileSync('data/usersData.json', JSON.stringify(filter));
        return NextResponse.json({ message: 'Deleting data...', status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing the request', status: 500 });
    }
}