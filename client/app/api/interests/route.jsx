
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const interests = require('data/interestsData.json');
        return NextResponse.json({ message: 'Sending data...', interests, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error getting data', status: 500 });
    }
}