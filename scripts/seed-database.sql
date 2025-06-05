-- This is a MongoDB seed script (JavaScript)
-- Run this in MongoDB shell or MongoDB Compass

// Create sample users
db.users.insertMany([
  {
    name: "John Doe",
    email: "john@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAHVfXe", // password123
    phone: "+1234567890",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAHVfXe", // password123
    phone: "+1234567891",
    role: "organizer",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create sample events
db.events.insertMany([
  {
    title: "Summer Music Festival",
    description: "Join us for the biggest summer music festival of the year!",
    category: "concert",
    date: new Date("2025-06-15"),
    startTime: "16:00",
    endTime: "23:00",
    location: {
      venueName: "Central Park",
      address: "5th Ave",
      city: "New York",
      state: "NY",
      zipCode: "10022"
    },
    organizer: ObjectId(), // Replace with actual user ID
    ticketTiers: [
      {
        id: "t1",
        name: "General Admission",
        price: 45,
        description: "Access to all stages",
        quantity: 1000,
        sold: 150
      },
      {
        id: "t2",
        name: "VIP Experience",
        price: 120,
        description: "VIP lounge access",
        quantity: 200,
        sold: 50
      }
    ],
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create sample trains
db.trains.insertMany([
  {
    trainName: "Northeast Express",
    trainNumber: "NE-101",
    source: "New York",
    destination: "Washington DC",
    departureTime: "08:30",
    arrivalTime: "11:45",
    duration: "3h 15m",
    classes: [
      {
        name: "Economy",
        price: 65,
        totalSeats: 200,
        availableSeats: 180
      },
      {
        name: "Business",
        price: 95,
        totalSeats: 50,
        availableSeats: 45
      }
    ],
    amenities: ["wifi", "food", "coffee"],
    status: "active",
    operatingDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  },
  {
    trainName: "Coast Starlight",
    trainNumber: "CS-303",
    source: "Los Angeles",
    destination: "San Francisco",
    departureTime: "07:00",
    arrivalTime: "15:45",
    duration: "8h 45m",
    classes: [
      {
        name: "Economy",
        price: 89,
        totalSeats: 300,
        availableSeats: 250
      },
      {
        name: "Business",
        price: 150,
        totalSeats: 80,
        availableSeats: 70
      }
    ],
    amenities: ["wifi", "food", "coffee"],
    status: "active",
    operatingDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  }
]);

// Create indexes for better performance
db.events.createIndex({ "location.city": 1, category: 1, date: 1 });
db.trains.createIndex({ source: 1, destination: 1 });
db.users.createIndex({ email: 1 }, { unique: true });
db.eventBookings.createIndex({ userId: 1, eventId: 1 });
db.railwayBookings.createIndex({ userId: 1, trainId: 1 });
