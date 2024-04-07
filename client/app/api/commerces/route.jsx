
import { writeFileSync } from 'fs';
import { NextResponse } from 'next/server'

// Returns all commerces in file
export async function GET() {
    try {
        const commerces = require('data/commerceData.json');
        return NextResponse.json({ message: 'Sending data...', commerces, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error getting data', status: 500 });
    }
}

// Modifies commerce in file
export async function PUT(request) {
    const data = await request.json();
    try {
        const commerces = require('data/commerceData.json');
        const updatedCommerces = commerces.map((commerce) => {
            if (commerce.id === data.id)
                return { ...commerce, ...data };
            return commerce;
        });

        writeFileSync('data/commerceData.json', JSON.stringify(updatedCommerces));
        return NextResponse.json({ message: 'Updated data successfully', status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing the request', status: 500 });
    }
}

// Saves all commerces to file
export async function POST(request) {
    const data = await request.json();
    try {
        const commerces = require('data/commerceData.json');
        writeFileSync('data/commerceData.json', JSON.stringify([...commerces, data]));
        return NextResponse.json({ message: 'Saving data...', status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing the request', status: 500 });
    }
}

// Removes commerce from file
export async function DELETE(request) {
    const data = await request.json();
    try {
        const commerces = require('data/commerceData.json');
        const filter = commerces.filter(c => c.id !== data.id);
        writeFileSync('data/commerceData.json', JSON.stringify(filter));
        return NextResponse.json({ message: 'Deleting data...', status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing the request', status: 500 });
    }
}